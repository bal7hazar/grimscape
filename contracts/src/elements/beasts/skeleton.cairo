// Internal imports

use grimscape::elements::beasts::interface::{BeastTrait, Tier, Offense, Defense};

impl Skeleton of BeastTrait {
    #[inline]
    fn tier() -> Tier {
        Tier::D
    }

    #[inline]
    fn offense() -> Offense {
        Offense::Bludgeon
    }

    #[inline]
    fn defense() -> Defense {
        Defense::Metal
    }
}
