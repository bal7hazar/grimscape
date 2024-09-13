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
fn test_campagn_interact() {
    // [Setup]
    let (world, systems, context) = setup::spawn_game();
    let store = StoreTrait::new(world);

    // [Move]
    systems.campagn.move(Direction::West.into());
    systems.campagn.move(Direction::West.into());
    systems.campagn.move(Direction::West.into());
    systems.campagn.move(Direction::West.into());
    systems.campagn.move(Direction::West.into());
    systems.campagn.move(Direction::West.into());
    systems.campagn.move(Direction::West.into());
    systems.campagn.explore(Direction::West.into());
    systems.campagn.move(Direction::West.into());
    systems.campagn.move(Direction::None.into()); // Pass

    // [Assert] Adventurer
    let player = store.get_player(context.player_id);
    let realm = store.get_realm(constants::REALM_ID);
    let dungeon = store.get_dungeon(realm.id, realm.dungeon_count);
    let adventurer = store.get_adventurer(realm.id, dungeon.id, player.adventurer_id);
    let adventurer_health = adventurer.health;

    // [Assert] Mob
    let room = store.get_room(realm.id, dungeon.id, adventurer.id, adventurer.x, adventurer.y);
    let mob_position = adventurer.position + room.width;
    let mob = store.search_mob(room, mob_position).unwrap();
    let mob_health = mob.health;

    // [Interact] Attack
    systems.campagn.interact(Direction::North.into()); // 26 -> 16

    // [Assert] Adventurer
    let adventurer = store.get_adventurer(realm.id, dungeon.id, player.adventurer_id);
    assert_eq!(adventurer.health < adventurer_health, true);

    // [Assert] Mob
    let mob = store
        .get_mob(realm.id, dungeon.id, adventurer.id, adventurer.x, adventurer.y, mob.id);
    assert_eq!(mob.health < mob_health, true);

    // [Interact] Attack
    systems.campagn.interact(Direction::North.into()); // 16 -> 6
    systems.campagn.interact(Direction::North.into()); // 6 -> 0

    // [Assert] Mob
    let mob = store
        .get_mob(realm.id, dungeon.id, adventurer.id, adventurer.x, adventurer.y, mob.id);
    assert_eq!(mob.health, 0);

    systems.campagn.move(Direction::East.into());
    systems.campagn.explore(Direction::East.into());
    systems.campagn.explore(Direction::West.into());
}
