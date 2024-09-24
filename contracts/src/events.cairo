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
    direction: u8,
    time: u64,
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
#[dojo::event]
struct AdventurerHit {
    #[key]
    id: u32,
    adventurer: Adventurer,
    mob: Mob,
    damage: u16,
    direction: u8,
    time: u64,
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
#[dojo::event]
struct MobUpdate {
    #[key]
    id: u32,
    mob: Mob,
    direction: u8,
    time: u64,
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
#[dojo::event]
struct MobHit {
    #[key]
    id: u32,
    mob: Mob,
    damage: u16,
    direction: u8,
    time: u64,
}
