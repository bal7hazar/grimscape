// Internal imports

use grimscape::elements::beasts::interface::{BeastTrait, Tier, Offense, Defense};

impl Bear of BeastTrait {
    #[inline]
    fn tier() -> Tier {
        Tier::D
    }

    #[inline]
    fn offense() -> Offense {
        Offense::Blade
    }

    #[inline]
    fn defense() -> Defense {
        Defense::Hide
    }
}
