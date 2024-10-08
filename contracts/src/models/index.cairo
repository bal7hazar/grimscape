#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct Player {
    #[key]
    pub id: felt252,
    pub adventurer_id: u32,
    pub name: felt252,
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct Realm {
    #[key]
    pub id: u32,
    pub dungeon_count: u32,
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct Dungeon {
    #[key]
    pub realm_id: u32,
    #[key]
    pub id: u32,
    pub nonce: u32,
    pub claimer: felt252,
    pub seed: felt252,
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct Adventurer {
    #[key]
    pub realm_id: u32,
    #[key]
    pub dungeon_id: u32,
    #[key]
    pub id: u32,
    pub x: i32,
    pub y: i32,
    pub position: u8,
    pub health: u16,
    pub base_health: u16,
    pub xp: u16,
    pub gold: u16,
    pub attribute_points: u8,
    pub attributes: u64, // Str, Dex, Vit, Int, Wsd, Cha
    pub gears: u64, // Weapon Chest Head Waist Foot Hand Neck Ring
    pub slots: u128, // 16 slots of 8 bits
    pub seed: felt252,
    pub player_id: felt252,
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct Room {
    #[key]
    pub realm_id: u32,
    #[key]
    pub dungeon_id: u32,
    #[key]
    pub adventurer_id: u32,
    #[key]
    pub x: i32,
    #[key]
    pub y: i32,
    pub width: u8,
    pub height: u8,
    pub mob_count: u8,
    pub entities: felt252,
    pub grid: felt252,
    pub seed: felt252,
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
pub struct Mob {
    #[key]
    pub realm_id: u32,
    #[key]
    pub dungeon_id: u32,
    #[key]
    pub adventurer_id: u32,
    #[key]
    pub x: i32,
    #[key]
    pub y: i32,
    #[key]
    pub id: u8,
    pub position: u8,
    pub distance: u8,
    pub next: u8,
    pub beast: u8,
    pub health: u16,
    pub level: u8,
    pub base_health: u16,
}
// #[derive(Copy, Drop, Serde)]
// #[dojo::model]
// pub struct Chest {
//     #[key]
//     pub realm_id: u32,
//     #[key]
//     pub dungeon_id: u32,
//     #[key]
//     pub adventurer_id: u32,
//     #[key]
//     pub x: i32,
//     #[key]
//     pub y: i32,
//     #[key]
//     pub id: u8,
//     pub position: u8,
//     pub category: u8,
// }

// #[derive(Copy, Drop, Serde)]
// #[dojo::model]
// pub struct Market {
//     #[key]
//     pub realm_id: u32,
//     #[key]
//     pub dungeon_id: u32,
//     #[key]
//     pub adventurer_id: u32,
//     #[key]
//     pub x: i32,
//     #[key]
//     pub y: i32,
//     #[key]
//     pub products: u128,
// }


