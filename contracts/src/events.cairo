// Internal imports

use grimscape::models::adventurer::Adventurer;
use grimscape::models::mob::Mob;

#[derive(Copy, Drop, Serde)]
#[dojo::model]
#[dojo::event]
struct AdventurerUpdate {
    #[key]
    id: u32,
    adventurer: Adventurer,
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
#[dojo::event]
struct AdventurerHit {
    #[key]
    id: u32,
    adventurer: Adventurer,
    mob: Mob,
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
#[dojo::event]
struct MobUpdate {
    #[key]
    id: u32,
    mob: Mob,
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
#[dojo::event]
struct MobHit {
    #[key]
    id: u32,
    mob: Mob,
    adventurer: Adventurer,
}
