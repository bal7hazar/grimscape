// Internal imports

use grimscape::types::tier::Tier;
use grimscape::types::defense::Defense;

trait ArmorTrait {
    fn tier() -> Tier;
    fn defense() -> Defense;
}
