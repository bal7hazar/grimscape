// Internal imports

use grimscape::elements::beasts::interface::{BeastTrait, Tier};

impl Goblin of BeastTrait {
    #[inline]
    fn tier() -> Tier {
        Tier::C
    }
}
