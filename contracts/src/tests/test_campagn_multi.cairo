// Core imports

use core::debug::PrintTrait;

// Starknet imports

use starknet::testing::{set_contract_address, set_transaction_hash};

// Dojo imports

use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};

// Internal imports

use grimscape::constants;
use grimscape::store::{Store, StoreTrait};
use grimscape::models::player::{Player, PlayerTrait};
use grimscape::models::realm::{Realm, RealmTrait};
use grimscape::models::dungeon::{Dungeon, DungeonTrait};
use grimscape::systems::campagn::ICampagnDispatcherTrait;
use grimscape::types::direction::Direction;

// Test imports

use grimscape::tests::setup::{setup, setup::{Systems, PLAYER}};

#[test]
fn test_campagn_multi() {
    // [Setup]
    let (world, systems, context) = setup::spawn_game();
    let store = StoreTrait::new(world);

    // [Move]
    let directions: Array<u8> = array![
        Direction::West.into(),
        Direction::West.into(),
        Direction::West.into(),
        Direction::West.into(),
        Direction::West.into(),
        Direction::West.into(),
        Direction::West.into(),
        Direction::West.into(), // Explore
    ];
    systems.campagn.multi_perform(directions);
    let directions: Array<u8> = array![
        Direction::West.into(),
        Direction::None.into(), // Pass
        Direction::North.into(), // Attack: 26 -> 16
        Direction::North.into(), // Not executed
        Direction::North.into(), // Not executed
    ];
    systems.campagn.multi_perform(directions);
    // [Assert] Mob
    let player = store.get_player(context.player_id);
    let realm = store.get_realm(constants::REALM_ID);
    let dungeon = store.get_dungeon(realm.id, realm.dungeon_count);
    let adventurer = store.get_adventurer(realm.id, dungeon.id, player.adventurer_id);
    let room = store.get_room(realm.id, dungeon.id, adventurer.id, adventurer.x, adventurer.y);
    let mob_position = adventurer.position + room.width;
    let mob = store.search_mob(room, mob_position).unwrap();
    assert_eq!(mob.health, 16);
}
