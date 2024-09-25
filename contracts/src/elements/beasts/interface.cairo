// Internal imports

use grimscape::types::tier::Tier;
use grimscape::types::offense::Offense;
use grimscape::types::defense::Defense;

trait BeastTrait {
    fn tier() -> Tier;
    fn offense() -> Offense;
    fn defense() -> Defense;
}
