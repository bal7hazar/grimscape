// Internal imports

use grimscape::elements::offenses::interface::{OffenseTrait, Defense};

impl Blade of OffenseTrait {
    #[inline]
    fn weakness() -> Defense {
        Defense::Metal
    }

    #[inline]
    fn strength() -> Defense {
        Defense::Cloth
    }
}
