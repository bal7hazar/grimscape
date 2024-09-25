// Internal imports

use grimscape::elements::beasts::interface::{BeastTrait, Tier};

impl Draugr of BeastTrait {
    #[inline]
    fn tier() -> Tier {
        Tier::B
    }
}
