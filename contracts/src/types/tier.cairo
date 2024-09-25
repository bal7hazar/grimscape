// Internal imports

use grimscape::elements::tiers;

// Constants

pub const TIER_COUNT: u8 = 5;
pub const MAX_XP_DECAY: u8 = 95;
pub const MINIMUM_XP: u16 = 4;
pub const XP_REWARD_DIVISOR: u8 = 2;
pub const GOLD_REWARD_DIVISOR: u8 = 2;

// Types

#[derive(Copy, Drop)]
pub enum Tier {
    None,
    S,
    A,
    B,
    C,
    D,
}

// Implementations

#[generate_trait]
impl TierImpl of TierTrait {
    #[inline]
    fn from(seed: felt252) -> Tier {
        let tier: u8 = (1_u256 + seed.into() % TIER_COUNT.into()).try_into().unwrap();
        tier.into()
    }

    #[inline]
    fn xp(self: Tier, adventurer_level: u8, beast_level: u8) -> u16 {
        let mut level_decay_percentage: u16 = core::cmp::min(
            adventurer_level.into() * 2, MAX_XP_DECAY.into()
        );
        let multiplier: u16 = match self {
            Tier::None => 0,
            Tier::S => tiers::s::S::xp_multiplier(),
            Tier::A => tiers::a::A::xp_multiplier(),
            Tier::B => tiers::b::B::xp_multiplier(),
            Tier::C => tiers::c::C::xp_multiplier(),
            Tier::D => tiers::d::D::xp_multiplier(),
        };
        let reward_amount: u16 = (multiplier * beast_level.into()) / XP_REWARD_DIVISOR.into();
        // [Compute] Apply level decay percentage on reward_amount
        let xp = reward_amount * (100 - level_decay_percentage) / 100;
        // [Compute] Ensure minimum xp
        core::cmp::max(xp, MINIMUM_XP)
    }

    #[inline]
    fn attack(self: Tier, weapon_level: u8) -> u16 {
        let multiplier: u16 = match self {
            Tier::None => 0,
            Tier::S => tiers::s::S::damage_multiplier(),
            Tier::A => tiers::a::A::damage_multiplier(),
            Tier::B => tiers::b::B::damage_multiplier(),
            Tier::C => tiers::c::C::damage_multiplier(),
            Tier::D => tiers::d::D::damage_multiplier(),
        };
        multiplier * weapon_level.into()
    }

    #[inline]
    fn defence(self: Tier, armor_level: u8) -> u16 {
        let multiplier: u16 = match self {
            Tier::None => 0,
            Tier::S => tiers::s::S::damage_multiplier(),
            Tier::A => tiers::a::A::damage_multiplier(),
            Tier::B => tiers::b::B::damage_multiplier(),
            Tier::C => tiers::c::C::damage_multiplier(),
            Tier::D => tiers::d::D::damage_multiplier(),
        };
        multiplier * armor_level.into()
    }

    #[inline]
    fn gold(self: Tier, beast_level: u8) -> u16 {
        let multiplier: u16 = match self {
            Tier::None => 0,
            Tier::S => tiers::s::S::gold_multiplier(),
            Tier::A => tiers::a::A::gold_multiplier(),
            Tier::B => tiers::b::B::gold_multiplier(),
            Tier::C => tiers::c::C::gold_multiplier(),
            Tier::D => tiers::d::D::gold_multiplier(),
        };
        multiplier * beast_level.into() / GOLD_REWARD_DIVISOR.into()
    }
}

impl IntoTierFelt252 of core::Into<Tier, felt252> {
    #[inline]
    fn into(self: Tier) -> felt252 {
        match self {
            Tier::None => 'NONE',
            Tier::S => 'S',
            Tier::A => 'A',
            Tier::B => 'B',
            Tier::C => 'C',
            Tier::D => 'D',
        }
    }
}

impl IntoTierU8 of core::Into<Tier, u8> {
    #[inline]
    fn into(self: Tier) -> u8 {
        match self {
            Tier::None => 0,
            Tier::S => 1,
            Tier::A => 2,
            Tier::B => 3,
            Tier::C => 4,
            Tier::D => 5,
        }
    }
}

impl IntoU8Tier of core::Into<u8, Tier> {
    #[inline]
    fn into(self: u8) -> Tier {
        let card: felt252 = self.into();
        match card {
            0 => Tier::None,
            1 => Tier::S,
            2 => Tier::A,
            3 => Tier::B,
            4 => Tier::C,
            5 => Tier::D,
            _ => Tier::None,
        }
    }
}

impl TierPartialEq of core::PartialEq<Tier> {
    #[inline]
    fn eq(lhs: @Tier, rhs: @Tier) -> bool {
        let lhs: u8 = (*lhs).into();
        let rhs: u8 = (*rhs).into();
        lhs == rhs
    }

    #[inline]
    fn ne(lhs: @Tier, rhs: @Tier) -> bool {
        let lhs: u8 = (*lhs).into();
        let rhs: u8 = (*rhs).into();
        lhs != rhs
    }
}

impl TierPrint of core::debug::PrintTrait<Tier> {
    #[inline]
    fn print(self: Tier) {
        let felt: felt252 = self.into();
        felt.print();
    }
}

