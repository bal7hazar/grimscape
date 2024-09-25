// Internal imports

use grimscape::elements::beasts::interface::{BeastTrait, Tier};

impl Griffin of BeastTrait {
    #[inline]
    fn tier() -> Tier {
        Tier::S
    }
}
