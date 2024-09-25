// External imports

use origami_map::map::{Map, MapTrait};

// External imports

use origami_map::helpers::heap::ItemTrait;

// Internal imports

use grimscape::constants;
use grimscape::models::index::Mob;
use grimscape::types::beast::{Beast, BeastTrait};
use grimscape::helpers::seeder::Seeder;

mod errors {
    const MOB_INVALID_BEAST: felt252 = 'Mob: invalid beast';
    const MOB_NOT_EXIST: felt252 = 'Mob: does not exist';
    const MOB_ALREADY_EXIST: felt252 = 'Mob: already exist';
    const MOB_INVALID_DIRECTION: felt252 = 'Mob: invalid direction';
    const MOB_IS_DEAD: felt252 = 'Mob: is dead';
    const MOB_NOT_DEAD: felt252 = 'Mob: not dead';
}

#[generate_trait]
impl MobImpl of MobTrait {
    #[inline]
    fn new(
        realm_id: u32,
        dungeon_id: u32,
        adventurer_id: u32,
        x: i32,
        y: i32,
        id: u8,
        position: u8,
        beast: Beast,
    ) -> Mob {
        // [Check] Beast is valid
        let beast: u8 = beast.into();
        assert(beast != Beast::None.into(), errors::MOB_INVALID_BEAST);
        // [Return] Mob
        Mob {
            realm_id,
            dungeon_id,
            adventurer_id,
            x,
            y,
            id,
            position,
            distance: 0,
            next: 0,
            beast,
            health: 0,
            level: 0,
            base_health: 0,
        }
    }

    #[inline]
    fn setup(ref self: Mob, adventurer_level: u8, seed: felt252) {
        // [Compute] Base health
        let beast: Beast = self.beast.into();
        let seed: u256 = seed.into();
        self.health = beast.health(adventurer_level, seed.low.into());
        self.base_health = self.health;
        self.level = beast.level(adventurer_level, seed.high.into());
    }

    #[inline]
    fn damage(self: Mob) -> u16 {
        let beast: Beast = self.beast.into();
        beast.damage(self.level)
    }

    #[inline]
    fn xp(self: Mob, adventurer_level: u8) -> u16 {
        let beast: Beast = self.beast.into();
        beast.xp(self.level, adventurer_level)
    }

    #[inline]
    fn gold(self: Mob) -> u16 {
        let beast: Beast = self.beast.into();
        beast.gold(self.level)
    }

    #[inline]
    fn is_dead(self: Mob) -> bool {
        self.health == 0
    }

    #[inline]
    fn take(ref self: Mob, damage: u16) -> u16 {
        self.health -= core::cmp::min(self.health, damage);
        damage
    }

    #[inline]
    fn move(ref self: Mob, position: u8) {
        self.position = position;
    }
}

#[generate_trait]
impl MobAssert of AssertTrait {
    #[inline]
    fn assert_not_dead(self: Mob) {
        assert(self.health != 0, errors::MOB_IS_DEAD);
    }

    #[inline]
    fn assert_is_dead(self: Mob) {
        assert(self.health == 0, errors::MOB_NOT_DEAD);
    }
}

impl MobItem of ItemTrait<Mob> {
    #[inline]
    fn key(self: Mob) -> u8 {
        self.id
    }
}

impl MobPartialOrd of PartialOrd<Mob> {
    #[inline]
    fn le(lhs: Mob, rhs: Mob) -> bool {
        lhs.distance <= rhs.distance
    }

    #[inline]
    fn ge(lhs: Mob, rhs: Mob) -> bool {
        lhs.distance >= rhs.distance
    }

    #[inline]
    fn lt(lhs: Mob, rhs: Mob) -> bool {
        lhs.distance < rhs.distance
    }

    #[inline]
    fn gt(lhs: Mob, rhs: Mob) -> bool {
        lhs.distance > rhs.distance
    }
}

#[cfg(test)]
mod tests {
    // Local imports

    use super::{Mob, MobTrait, MobAssert, Beast, BeastTrait};

    // Constants

    const REALM_ID: u32 = 1;
    const DUNGEON_ID: u32 = 2;
    const ADVENTURER_ID: u32 = 3;
    const X: i32 = -5;
    const Y: i32 = 42;
    const MOB_ID: u8 = 4;
    const BEAST: Beast = Beast::Goblin;
    const SEED: felt252 = 'SEED';

    #[test]
    fn test_mob_new() {
        let mob = MobTrait::new(REALM_ID, DUNGEON_ID, ADVENTURER_ID, X, Y, MOB_ID, 0, BEAST);
        assert_eq!(mob.realm_id, REALM_ID);
        assert_eq!(mob.dungeon_id, DUNGEON_ID);
        assert_eq!(mob.adventurer_id, ADVENTURER_ID);
        assert_eq!(mob.x, X);
        assert_eq!(mob.y, Y);
        assert_eq!(mob.id, MOB_ID);
    }

    #[test]
    fn test_mob_setup() {
        let mut mob = MobTrait::new(REALM_ID, DUNGEON_ID, ADVENTURER_ID, X, Y, MOB_ID, 0, BEAST);
        mob.setup(1, 'SEED');
        assert_eq!(mob.health, BEAST.health(1, 'SEED'));
    }

    #[test]
    fn test_mob_take() {
        let mut mob = MobTrait::new(REALM_ID, DUNGEON_ID, ADVENTURER_ID, X, Y, MOB_ID, 0, BEAST);
        mob.setup(1, 'SEED');
        mob.take(10);
        assert_eq!(mob.health, BEAST.health(1, 'SEED') - 10);
    }
}
