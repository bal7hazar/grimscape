// Internal imports

use grimscape::types::tier::Tier;
use grimscape::types::offense::Offense;

trait WeaponTrait {
    fn tier() -> Tier;
    fn offense() -> Offense;
}
