// Internal imports

use grimscape::elements::beasts::interface::{BeastTrait, Tier, Offense, Defense};

impl Fairy of BeastTrait {
    #[inline]
    fn tier() -> Tier {
        Tier::D
    }

    #[inline]
    fn offense() -> Offense {
        Offense::Magic
    }

    #[inline]
    fn defense() -> Defense {
        Defense::Cloth
    }
}
