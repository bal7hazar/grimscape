// Internal imports

use grimscape::elements::weapons::interface::{WeaponTrait, Tier, Offense};

// Implementations

impl Katana of WeaponTrait {
    #[inline]
    fn tier() -> Tier {
        return Tier::S;
    }

    #[inline]
    fn offense() -> Offense {
        return Offense::Blade;
    }
}
