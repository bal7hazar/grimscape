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

// Test imports

use grimscape::tests::setup::{setup, setup::{Systems, PLAYER}};

#[test]
fn test_actions_setup() {
    // [Setup]
    let (world, _, context) = setup::spawn_game();
    let store = StoreTrait::new(world);

    // [Assert] Player
    let player = store.get_player(context.player_id);
    assert_eq!(player.id, context.player_id);

    // [Assert] Factory
    let realm = store.get_realm(constants::REALM_ID);
    assert_eq!(realm.id, constants::REALM_ID);

    // [Assert] Dungeon
    let dungeon = store.get_dungeon(realm.id, realm.dungeon_count);
    assert_eq!(dungeon.seed != 0, true);

    // [Assert] Adventurer
    let dungeon = store.get_dungeon(realm.id, realm.dungeon_count);
    let adventurer = store.get_adventurer(realm.id, dungeon.id, player.adventurer_id);
    assert_eq!(adventurer.position, constants::ROOM_WIDTH * constants::ROOM_HEIGHT / 2);
}
