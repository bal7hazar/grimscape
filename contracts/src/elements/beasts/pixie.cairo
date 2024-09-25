// Internal imports

use grimscape::elements::beasts::interface::{BeastTrait, Tier};

impl Pixie of BeastTrait {
    #[inline]
    fn tier() -> Tier {
        Tier::D
    }
}
