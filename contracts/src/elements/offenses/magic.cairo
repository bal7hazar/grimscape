// Internal imports

use grimscape::elements::offenses::interface::{OffenseTrait, Defense};

impl Magic of OffenseTrait {
    #[inline]
    fn weakness() -> Defense {
        Defense::Hide
    }

    #[inline]
    fn strength() -> Defense {
        Defense::Metal
    }
}
