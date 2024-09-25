// Internal imports

use grimscape::elements::beasts::interface::{BeastTrait, Tier};

impl Kappa of BeastTrait {
    #[inline]
    fn tier() -> Tier {
        Tier::C
    }
}
