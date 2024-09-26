// Internal imports

use grimscape::elements::beasts::interface::{BeastTrait, Tier};

impl Typhon of BeastTrait {
    #[inline]
    fn tier() -> Tier {
        Tier::S
    }
}