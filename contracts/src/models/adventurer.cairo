// External imports

use origami_map::map::{Map, MapTrait};

// Internal imports

use grimscape::constants;
use grimscape::models::index::Adventurer;
use grimscape::types::direction::Direction;
use grimscape::helpers::seeder::Seeder;

mod errors {
    const ADVENTURER_INVALID_BEAST: felt252 = 'Adventurer: invalid beast';
    const ADVENTURER_NOT_EXIST: felt252 = 'Adventurer: does not exist';
    const ADVENTURER_ALREADY_EXIST: felt252 = 'Adventurer: already exist';
    const ADVENTURER_INVALID_DIRECTION: felt252 = 'Adventurer: invalid direction';
    const ADVENTURER_IS_DEAD: felt252 = 'Adventurer: is dead';
    const ADVENTURER_NOT_DEAD: felt252 = 'Adventurer: not dead';
}

#[generate_trait]
impl AdventurerImpl of AdventurerTrait {
    #[inline]
    fn new(
        realm_id: u32, dungeon_id: u32, id: u32, player_id: felt252, seed: felt252
    ) -> Adventurer {
        let position = constants::ROOM_WIDTH * constants::ROOM_HEIGHT / 2;
        Adventurer {
            realm_id,
            dungeon_id,
            id,
            x: 0,
            y: 0,
            position,
            health: constants::ADVENTURER_DEFAULT_HEALTH,
            xp: 0,
            gold: constants::ADVENTURER_DEFAULT_GOLD,
            weapon: 0,
            gears: 0,
            attributes: 0,
            seed,
            player_id,
        }
    }

    #[inline]
    fn is_dead(self: Adventurer) -> bool {
        self.health == 0
    }

    #[inline]
    fn damage(self: Adventurer) -> u16 {
        // TODO: Implement damage calculation
        10
    }

    #[inline]
    fn take(ref self: Adventurer, damage: u16) {
        self.health -= core::cmp::min(self.health, damage.into());
    }

    #[inline]
    fn explore(ref self: Adventurer, direction: Direction) {
        // [Compute] Global and local positions
        let (x, y, position) = match direction {
            Direction::North => (self.x, self.y + 1, constants::ROOM_SOUTH_POSITION),
            Direction::East => (self.x + 1, self.y, constants::ROOM_WEST_POSITION),
            Direction::South => (self.x, self.y - 1, constants::ROOM_NORTH_POSITION),
            Direction::West => (self.x - 1, self.y, constants::ROOM_EAST_POSITION),
            _ => (self.x, self.y, self.position),
        };
        self.x = x;
        self.y = y;
        self.position = position;
    }

    #[inline]
    fn move(ref self: Adventurer, direction: Direction) {
        let width: u8 = constants::ROOM_WIDTH;
        let height: u8 = constants::ROOM_HEIGHT;
        let (x, y) = (self.position % width, self.position / width);
        self.position = match direction {
            Direction::North => {
                if y < height - 1 {
                    self.position + width
                } else {
                    self.position
                }
            },
            Direction::East => { if x > 0 {
                self.position - 1
            } else {
                self.position
            } },
            Direction::South => { if y > 0 {
                self.position - width
            } else {
                self.position
            } },
            Direction::West => { if x < width - 1 {
                self.position + 1
            } else {
                self.position
            } },
            _ => self.position,
        };
    }
}

#[generate_trait]
impl AdventurerAssert of AssertTrait {
    #[inline]
    fn assert_is_exist(self: Adventurer) {
        assert(self.seed != 0 && !self.is_dead(), errors::ADVENTURER_NOT_EXIST);
    }

    #[inline]
    fn assert_not_exists(self: Adventurer) {
        assert(self.seed == 0 || self.is_dead(), errors::ADVENTURER_ALREADY_EXIST);
    }

    #[inline]
    fn assert_not_dead(self: Adventurer) {
        assert(!self.is_dead(), errors::ADVENTURER_IS_DEAD);
    }

    #[inline]
    fn assert_is_dead(self: Adventurer) {
        assert(self.is_dead(), errors::ADVENTURER_NOT_DEAD);
    }
}

#[cfg(test)]
mod tests {
    // Local imports

    use super::{Adventurer, AdventurerTrait, AdventurerAssert};

    // Constants

    const REALM_ID: u32 = 1;
    const DUNGEON_ID: u32 = 2;
    const ADVENTURER_ID: u32 = 3;
    const PLAYER_ID: felt252 = 'PLAYER';
    const SEED: felt252 = 'SEED';

    #[test]
    fn test_adventurer_new() {
        let adventurer = AdventurerTrait::new(REALM_ID, DUNGEON_ID, ADVENTURER_ID, PLAYER_ID, SEED);
        assert_eq!(adventurer.realm_id, REALM_ID);
        assert_eq!(adventurer.dungeon_id, DUNGEON_ID);
        assert_eq!(adventurer.id, ADVENTURER_ID);
        assert_eq!(adventurer.player_id, PLAYER_ID);
        assert_eq!(adventurer.seed, SEED);
    }
}
