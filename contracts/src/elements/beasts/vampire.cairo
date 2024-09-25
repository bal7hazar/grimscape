// Internal imports

use grimscape::elements::beasts::interface::{BeastTrait, Tier};

impl Vampire of BeastTrait {
    #[inline]
    fn tier() -> Tier {
        Tier::B
    }
}
