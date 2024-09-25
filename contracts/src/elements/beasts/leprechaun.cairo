// Internal imports

use grimscape::elements::beasts::interface::{BeastTrait, Tier};

impl Leprechaun of BeastTrait {
    #[inline]
    fn tier() -> Tier {
        Tier::D
    }
}
