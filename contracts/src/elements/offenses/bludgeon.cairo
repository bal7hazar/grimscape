// Internal imports

use grimscape::elements::offenses::interface::{OffenseTrait, Defense};

impl Bludgeon of OffenseTrait {
    #[inline]
    fn weakness() -> Defense {
        Defense::Cloth
    }

    #[inline]
    fn strength() -> Defense {
        Defense::Hide
    }
}
