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
use grimscape::systems::actions::IActionsDispatcherTrait;
use grimscape::types::direction::Direction;

// Test imports

use grimscape::tests::setup::{setup, setup::{Systems, PLAYER}};

#[test]
fn test_actions_explore() {
    // [Setup]
    let (world, systems, context) = setup::spawn_game();
    let store = StoreTrait::new(world);

    // [Assert] Adventurer
    let player = store.get_player(context.player_id);
    let realm = store.get_realm(constants::REALM_ID);
    let dungeon = store.get_dungeon(realm.id, realm.dungeon_count);
    let adventurer = store.get_adventurer(realm.id, dungeon.id, player.adventurer_id);
    let adventurer_x = adventurer.x;
    let adventurer_y = adventurer.y;

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
    systems.actions.multiperform(directions);

    // [Assert] Adventurer
    let adventurer = store.get_adventurer(realm.id, dungeon.id, player.adventurer_id);
    assert_eq!(adventurer.x + 1, adventurer_x);
    assert_eq!(adventurer.y, adventurer_y);
}
