// Internal imports

use grimscape::elements::beasts::interface::{BeastTrait, Tier};

impl Gnome of BeastTrait {
    #[inline]
    fn tier() -> Tier {
        Tier::D
    }
}
