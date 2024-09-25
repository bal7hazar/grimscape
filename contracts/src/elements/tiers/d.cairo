// Internal imports

use grimscape::elements::tiers::interface::TierTrait;

// Constants

const XP_MULTIPLIER: u16 = 1;
const DAMAGE_MULTIPLIER: u16 = 1;
const GOLD_MULTIPLIER: u16 = 1;

pub impl D of TierTrait {
    #[inline]
    fn xp_multiplier() -> u16 {
        XP_MULTIPLIER
    }

    #[inline]
    fn damage_multiplier() -> u16 {
        DAMAGE_MULTIPLIER
    }

    #[inline]
    fn gold_multiplier() -> u16 {
        GOLD_MULTIPLIER
    }
}
