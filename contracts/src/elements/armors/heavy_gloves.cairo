// Internal imports

use grimscape::elements::armors::interface::{ArmorTrait, Tier, Defense};

// Implementations

impl HeavyGloves of ArmorTrait {
    #[inline]
    fn tier() -> Tier {
        return Tier::S;
    }

    #[inline]
    fn defense() -> Defense {
        Defense::Metal
    }
}
