// Internal imports

use grimscape::elements::beasts::interface::{BeastTrait, Tier};

impl Kelpie of BeastTrait {
    #[inline]
    fn tier() -> Tier {
        Tier::D
    }
}
