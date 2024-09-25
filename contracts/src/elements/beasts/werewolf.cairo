// Internal imports

use grimscape::elements::beasts::interface::{BeastTrait, Tier};

impl Werewolf of BeastTrait {
    #[inline]
    fn tier() -> Tier {
        Tier::B
    }
}
