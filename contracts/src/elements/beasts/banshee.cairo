// Internal imports

use grimscape::elements::beasts::interface::{BeastTrait, Tier};

impl Banshee of BeastTrait {
    #[inline]
    fn tier() -> Tier {
        Tier::B
    }
}