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
use grimscape::types::attribute::{Attribute, AttributeTrait};
use grimscape::helpers::packer::Packer;

// Test imports

use grimscape::tests::setup::{setup, setup::{Systems, PLAYER}};

#[test]
fn test_actions_update() {
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
        Direction::West.into(),
        Direction::None.into(), // Pass
        Direction::North.into(), // Attack: 18 -> 8
    ];
    systems.actions.multiperform(directions);
    let directions: Array<u8> = array![Direction::North.into(), // Attack: 8 -> 0
    ];
    systems.actions.multiperform(directions);
    // [Assert] Adventurer
    let player = store.get_player(context.player_id);
    let realm = store.get_realm(constants::REALM_ID);
    let dungeon = store.get_dungeon(realm.id, realm.dungeon_count);
    let adventurer = store.get_adventurer(realm.id, dungeon.id, player.adventurer_id);
    assert_eq!(adventurer.attribute_points > 0, true);

    // [Update]
    let attribute = Attribute::Strength;
    let strength: u8 = Packer::get(
        adventurer.attributes, attribute.index(), constants::ATTRIBUTE_SIZE
    );
    systems.actions.update(attribute.into());

    // [Assert] Adventurer
    let adventurer = store.get_adventurer(realm.id, dungeon.id, player.adventurer_id);
    let new_strength: u8 = Packer::get(
        adventurer.attributes, attribute.index(), constants::ATTRIBUTE_SIZE
    );
    assert_eq!(new_strength, strength + 1);
}
