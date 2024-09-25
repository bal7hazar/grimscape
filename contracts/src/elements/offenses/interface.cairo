// Internal imports

use grimscape::types::defense::Defense;

trait OffenseTrait {
    fn weakness() -> Defense;
    fn strength() -> Defense;
}
