// Internal imports

use grimscape::elements::rings::interface::{RingTrait, Tier};

// Implementations

impl Gold of RingTrait {
    #[inline]
    fn tier() -> Tier {
        return Tier::S;
    }
}
