// External imports

use origami_random::dice::{Dice, DiceTrait};
use origami_map::map::{Map, MapTrait};

// Internal imports

use grimscape::helpers::seeder::Seeder;
use grimscape::helpers::bitmap::Bitmap;
use grimscape::models::index::Room;
use grimscape::types::direction::Direction;
use grimscape::constants;

// Constants

const MULTIPLIER: u256 = 100;

// Errors

mod errors {
    const ROOM_INVALID_SEED: felt252 = 'Room: invalid seed';
    const ROOM_NOT_EXPLORED: felt252 = 'Room: not explored';
    const ROOM_ALREADY_EXPLORED: felt252 = 'Room: already explored';
    const ROOM_POSITION_NOT_FREE: felt252 = 'Room: position not free';
    const ROOM_CANNOT_LEAVE: felt252 = 'Room: cannot leave';
    const ROOM_CANNOT_INTERACT: felt252 = 'Room: cannot interact';
    const ROOM_INVALID_SIZE: felt252 = 'Room: invalid size';
}

#[generate_trait]
impl RoomImpl of RoomTrait {
    #[inline]
    fn new(realm_id: u32, dungeon_id: u32, adventurer_id: u32, x: i32, y: i32) -> Room {
        let mut room = Room {
            realm_id,
            dungeon_id,
            adventurer_id,
            x,
            y,
            width: 0,
            height: 0,
            mob_count: 0,
            entities: 0,
            grid: 0,
            seed: 0
        };
        room.setup();
        room
    }

    #[inline]
    fn new_spawn(
        realm_id: u32, dungeon_id: u32, adventurer_id: u32, x: i32, y: i32, seed: felt252
    ) -> Room {
        // [Compute] Empty room
        let width = constants::ROOM_WIDTH;
        let height = constants::ROOM_HEIGHT;
        let mut map: Map = MapTrait::new_empty(width, height, seed);
        map.open_with_corridor(constants::ROOM_NORTH_POSITION);
        map.open_with_corridor(constants::ROOM_EAST_POSITION);
        map.open_with_corridor(constants::ROOM_SOUTH_POSITION);
        map.open_with_corridor(constants::ROOM_WEST_POSITION);
        // [Return] Room
        Room {
            realm_id,
            dungeon_id,
            adventurer_id,
            x,
            y,
            width,
            height,
            mob_count: 0,
            entities: 0,
            grid: map.grid,
            seed,
        }
    }

    #[inline]
    fn can_leave(self: Room, position: u8, direction: Direction) -> bool {
        let (x, y) = (position % self.width, position / self.width);
        match direction {
            Direction::North => y == self.height - 1,
            Direction::East => x == 0,
            Direction::South => y == 0,
            Direction::West => x == self.width - 1,
            _ => false,
        }
    }

    #[inline]
    fn can_interact(self: Room, position: u8, direction: Direction) -> bool {
        let target = self.next(position, direction);
        target != position && !self.is_free(target)
    }

    #[inline]
    fn is_explored(self: Room) -> bool {
        self.seed != 0
    }

    #[inline]
    fn is_free(self: Room, position: u8) -> bool {
        let map: u256 = self.grid.into() ^ self.entities.into();
        1 == Bitmap::get(map, position)
    }

    #[inline]
    fn next(self: Room, position: u8, direction: Direction) -> u8 {
        let (x, y) = (position % self.width, position / self.width);
        match direction {
            Direction::North => {
                if y < self.height - 1 {
                    return position + self.width;
                }
                position
            },
            Direction::East => {
                if x > 0 {
                    return position - 1;
                }
                position
            },
            Direction::South => {
                if y > 0 {
                    return position - self.width;
                }
                position
            },
            Direction::West => {
                if x < self.width - 1 {
                    return position + 1;
                }
                position
            },
            _ => position,
        }
    }

    #[inline]
    fn search_next(self: Room, from: u8, to: u8) -> u8 {
        let map: Map = MapTrait::new(self.grid, constants::ROOM_WIDTH, constants::ROOM_HEIGHT, 0);
        let mut path: Span<u8> = map.search_path(from, to);
        if path.is_empty() {
            from
        } else {
            *path.pop_back().unwrap()
        }
    }

    #[inline]
    fn setup(ref self: Room) {
        // [Check] Room is not explored
        self.assert_not_explored();
        // [Check] Width and height are valid
        let width = constants::ROOM_WIDTH;
        let height = constants::ROOM_HEIGHT;
        assert(width > 0 && height > 0, errors::ROOM_INVALID_SIZE);
        assert(width * height <= 255, errors::ROOM_INVALID_SIZE);
        // [Effect] Update width and height
        self.width = width;
        self.height = height;
    }

    #[inline]
    fn explore(ref self: Room, seed: felt252) {
        // [Check] Seed is valid
        assert(seed != 0, errors::ROOM_INVALID_SEED);
        self.seed = seed;
        // [Compute] Grid
        let mut map: Map = MapTrait::new_random_walk(
            self.width, self.height, constants::ROOM_STEPS, seed
        );
        map.open_with_maze(constants::ROOM_NORTH_POSITION);
        map.open_with_maze(constants::ROOM_EAST_POSITION);
        map.open_with_maze(constants::ROOM_SOUTH_POSITION);
        map.open_with_maze(constants::ROOM_WEST_POSITION);
        self.grid = map.grid;
        // [Compute] Mob count
        let mob_seed = Seeder::reseed(seed, 'MOB');
        let mut dice: Dice = DiceTrait::new(constants::ROOM_BEAST_COUNT, mob_seed);
        self.mob_count = dice.roll();
    }

    #[inline]
    fn spawn_mobs(ref self: Room) -> Array<u8> {
        // [Effect] Spawn mobs
        let mob_seed: felt252 = Seeder::reseed(self.seed, 'MOBS');
        self.spawn(self.mob_count, mob_seed)
    }

    #[inline]
    fn map(self: Room) -> felt252 {
        let map: u256 = self.grid.into() & ~self.entities.into();
        map.try_into().unwrap()
    }

    #[inline]
    fn spawn(ref self: Room, count: u8, seed: felt252) -> Array<u8> {
        // [Compute] Free positions inside the map (grid - entities)
        let map: Map = MapTrait::new(self.map(), self.width, self.height, seed);
        // [Compute] Grid of entities distribution
        let mut entities: u256 = map.compute_distribution(count, seed).into();
        // [Effect] Update entities
        // TODO: could do an unsafe + instead of bit_or since bits are disjoint
        self.entities = (entities | self.entities.into()).try_into().unwrap();
        // [Effect] Extract entity positions from grid
        let mut positions: Array<u8> = array![];
        let mut index = 0;
        while entities > 0 {
            if entities % 2 == 1 {
                positions.append(index);
            }
            entities /= 2;
            index += 1;
        };
        // [Return] Entity positions
        positions
    }

    #[inline]
    fn add(ref self: Room, position: u8) {
        // [Check] Position if free
        assert(self.is_free(position), errors::ROOM_POSITION_NOT_FREE);
        // [Effect] Update position
        let mut entities: u256 = self.entities.into();
        entities = Bitmap::set(entities, position);
        self.entities = entities.try_into().unwrap();
    }

    #[inline]
    fn remove(ref self: Room, position: u8) {
        // [Check] Position if not free
        assert(!self.is_free(position), errors::ROOM_POSITION_NOT_FREE);
        // [Effect] Update position
        let mut entities: u256 = self.entities.into();
        entities = Bitmap::unset(entities, position);
        self.entities = entities.try_into().unwrap();
    }

    #[inline]
    fn move(ref self: Room, from: u8, to: u8) {
        // [Check] From and to positions are different, otherwise leave as is
        if from == to {
            return;
        }
        // [Check] Target position if free
        self.assert_is_free(to);
        // [Effect] Update positions
        let mut entities: u256 = self.entities.into();
        entities = Bitmap::unset(entities, from);
        entities = Bitmap::set(entities, to);
        self.entities = entities.try_into().unwrap();
    }
}

#[generate_trait]
impl RoomAssert of AssertTrait {
    #[inline]
    fn assert_is_explored(self: Room) {
        assert(self.is_explored(), errors::ROOM_NOT_EXPLORED);
    }

    #[inline]
    fn assert_not_explored(self: Room) {
        assert(!self.is_explored(), errors::ROOM_ALREADY_EXPLORED);
    }

    #[inline]
    fn assert_is_free(self: Room, position: u8) {
        assert(self.is_free(position), errors::ROOM_POSITION_NOT_FREE);
    }

    #[inline]
    fn assert_can_interact(self: Room, position: u8, direction: Direction) {
        assert(self.can_interact(position, direction), errors::ROOM_CANNOT_INTERACT);
    }

    #[inline]
    fn assert_can_leave(self: Room, position: u8, direction: Direction) {
        assert(self.can_leave(position, direction), errors::ROOM_CANNOT_LEAVE);
    }
}

#[cfg(test)]
mod tests {
    // Local imports

    use super::{Room, RoomTrait, AssertTrait};

    // Constants

    const REALM_ID: u32 = 1;
    const DUNGEON_ID: u32 = 1;
    const ADVENTURER_ID: u32 = 1;
    const X: i32 = -5;
    const Y: i32 = 42;
    const SEED: felt252 = 'SEED';

    #[test]
    fn test_room_new() {
        let room: Room = RoomTrait::new(REALM_ID, DUNGEON_ID, ADVENTURER_ID, X, Y);
        assert_eq!(room.realm_id, REALM_ID);
        assert_eq!(room.dungeon_id, DUNGEON_ID);
        assert_eq!(room.adventurer_id, ADVENTURER_ID);
        assert_eq!(room.x, X);
        assert_eq!(room.y, Y);
    }

    #[test]
    fn test_room_new_spawn() {
        let spawn: Room = RoomTrait::new_spawn(REALM_ID, DUNGEON_ID, ADVENTURER_ID, X, Y, SEED);
        assert_eq!(spawn.realm_id, REALM_ID);
        assert_eq!(spawn.dungeon_id, DUNGEON_ID);
        assert_eq!(spawn.adventurer_id, ADVENTURER_ID);
        assert_eq!(spawn.x, X);
        assert_eq!(spawn.y, Y);
        assert_eq!(spawn.seed, SEED);
    }

    #[test]
    fn test_room_explore() {
        let mut room: Room = RoomTrait::new(REALM_ID, DUNGEON_ID, ADVENTURER_ID, X, Y);
        room.explore(SEED);
        assert_eq!(room.grid.into() > 0_u256, true);
        assert_eq!(room.mob_count > 0, true);
    }
}
