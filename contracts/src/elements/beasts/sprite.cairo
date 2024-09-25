// Internal imports

use grimscape::elements::beasts::interface::{BeastTrait, Tier};

impl Sprite of BeastTrait {
    #[inline]
    fn tier() -> Tier {
        Tier::C
    }
}
