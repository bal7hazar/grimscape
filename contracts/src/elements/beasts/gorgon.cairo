// Internal imports

use grimscape::elements::beasts::interface::{BeastTrait, Tier};

impl Gorgon of BeastTrait {
    #[inline]
    fn tier() -> Tier {
        Tier::A
    }
}
