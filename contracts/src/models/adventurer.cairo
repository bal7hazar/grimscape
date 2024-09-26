// External imports

use origami_map::map::{Map, MapTrait};

// Internal imports

use grimscape::constants;
use grimscape::models::index::Adventurer;
use grimscape::types::direction::Direction;
use grimscape::types::attribute::{Attribute, AttributeTrait, AttributeAssert};
use grimscape::types::weapon::{Weapon, WeaponTrait, WeaponAssert};
use grimscape::helpers::seeder::Seeder;
use grimscape::helpers::packer::Packer;

mod errors {
    const ADVENTURER_INVALID_BEAST: felt252 = 'Adventurer: invalid beast';
    const ADVENTURER_NOT_EXIST: felt252 = 'Adventurer: does not exist';
    const ADVENTURER_ALREADY_EXIST: felt252 = 'Adventurer: already exist';
    const ADVENTURER_INVALID_DIRECTION: felt252 = 'Adventurer: invalid direction';
    const ADVENTURER_IS_DEAD: felt252 = 'Adventurer: is dead';
    const ADVENTURER_NOT_DEAD: felt252 = 'Adventurer: not dead';
    const ADVENTURER_NOT_UPGRADABLE: felt252 = 'Adventurer: not upgradable';
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
            base_health: constants::ADVENTURER_DEFAULT_HEALTH,
            xp: 1,
            gold: constants::ADVENTURER_DEFAULT_GOLD,
            attribute_points: 0,
            attributes: constants::ADVENTURER_DEFAULT_ATTRIBUTES,
            gears: constants::ADVENTURER_DEFAULT_GEARS,
            slots: 0,
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
        // [Check] Weapon is valid
        let value: u8 = Packer::get(self.gears, constants::WEAPON_INDEX, constants::GEAR_SIZE);
        let weapon: Weapon = value.into();
        weapon.assert_is_valid();
        // [Compute] Base damage
        // FIXME: Store a weapon level
        let base = weapon.damage(1);
        // [Compute] Bonus damage (10% per strength points)
        let strength_index = Attribute::Strength.index();
        let strength = Packer::get(self.attributes, strength_index, constants::ATTRIBUTE_SIZE);
        base + base * strength / 10
    }

    #[inline]
    fn level(self: Adventurer) -> u8 {
        core::num::traits::Sqrt::sqrt(self.xp)
    }

    #[inline]
    fn reward(ref self: Adventurer, xp: u16, gold: u16) {
        let level: u8 = self.level();
        self.xp += xp;
        self.gold += gold;
        self.attribute_points += self.level() - level;
    }

    #[inline]
    fn take(ref self: Adventurer, damage: u16) -> u16 {
        self.health -= core::cmp::min(self.health, damage);
        damage
    }

    #[inline]
    fn heal(ref self: Adventurer, health: u16) {
        self.health = core::cmp::min(self.base_health, self.health + health);
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

    #[inline]
    fn upgrade(ref self: Adventurer, attribute: Attribute) {
        // [Check] Attribute is valid
        attribute.assert_is_valid();
        // [Check] Attribute points
        self.assert_is_upgradable();
        // [Effect] Remove attribute points
        self.attribute_points -= 1;
        // [Effect] Upgrade attribute
        let index = attribute.index();
        let value: u8 = Packer::get(self.attributes, index, constants::ATTRIBUTE_SIZE);
        self.attributes = Packer::set(self.attributes, index, constants::ATTRIBUTE_SIZE, value + 1);
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

    #[inline]
    fn assert_is_upgradable(self: Adventurer) {
        assert(self.attribute_points > 0, errors::ADVENTURER_NOT_UPGRADABLE);
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
