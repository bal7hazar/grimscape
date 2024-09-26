// Internal imports

use grimscape::constants;
use grimscape::elements::weapons;
use grimscape::types::tier::{Tier, TierTrait};
use grimscape::types::offense::Offense;

// Constants

pub const WEAPON_COUNT: u8 = 1;

// Errors

mod errors {
    pub const WEAPON_INVALID_VALUE: felt252 = 'Weapon: invalid value';
}

// Types

#[derive(Copy, Drop)]
pub enum Weapon {
    None,
    Katana,
}

// Implementations

#[generate_trait]
impl WeaponImpl of WeaponTrait {
    #[inline]
    fn from(seed: felt252) -> Weapon {
        let slot: u8 = (1_u256 + seed.into() % WEAPON_COUNT.into()).try_into().unwrap();
        slot.into()
    }

    #[inline]
    fn tier(self: Weapon) -> Tier {
        match self {
            Weapon::None => Tier::S,
            Weapon::Katana => weapons::katana::Katana::tier(),
        }
    }

    #[inline]
    fn offense(self: Weapon) -> Offense {
        match self {
            Weapon::None => Offense::None,
            Weapon::Katana => weapons::katana::Katana::offense(),
        }
    }

    #[inline]
    fn damage(self: Weapon, level: u8) -> u16 {
        let tier: Tier = self.tier();
        tier.attack(level)
    }
}

#[generate_trait]
impl WeaponAssert of AssertTrait {
    #[inline]
    fn assert_is_valid(self: Weapon) {
        assert(self != Weapon::None, errors::WEAPON_INVALID_VALUE);
    }
}

impl IntoWeaponFelt252 of core::Into<Weapon, felt252> {
    #[inline]
    fn into(self: Weapon) -> felt252 {
        match self {
            Weapon::None => 'NONE',
            Weapon::Katana => 'KATANA',
        }
    }
}

impl IntoWeaponU8 of core::Into<Weapon, u8> {
    #[inline]
    fn into(self: Weapon) -> u8 {
        match self {
            Weapon::None => 0,
            Weapon::Katana => 1,
        }
    }
}

impl IntoU8Weapon of core::Into<u8, Weapon> {
    #[inline]
    fn into(self: u8) -> Weapon {
        let card: felt252 = self.into();
        match card {
            0 => Weapon::None,
            1 => Weapon::Katana,
            _ => Weapon::None,
        }
    }
}

impl WeaponPartialEq of core::PartialEq<Weapon> {
    #[inline]
    fn eq(lhs: @Weapon, rhs: @Weapon) -> bool {
        let lhs: u8 = (*lhs).into();
        let rhs: u8 = (*rhs).into();
        lhs == rhs
    }

    #[inline]
    fn ne(lhs: @Weapon, rhs: @Weapon) -> bool {
        let lhs: u8 = (*lhs).into();
        let rhs: u8 = (*rhs).into();
        lhs != rhs
    }
}

impl WeaponPrint of core::debug::PrintTrait<Weapon> {
    #[inline]
    fn print(self: Weapon) {
        let felt: felt252 = self.into();
        felt.print();
    }
}
