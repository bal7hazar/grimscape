#[starknet::component]
mod PlayableComponent {
    // Starknet imports

    use starknet::info::{get_caller_address, get_block_timestamp};

    // Dojo imports

    use dojo::world::IWorldDispatcher;
    use dojo::world::IWorldDispatcherTrait;

    // Internal imports

    use grimscape::constants::REALM_ID;
    use grimscape::store::{Store, StoreTrait};
    use grimscape::models::realm::{Realm, RealmTrait, RealmAssert};
    use grimscape::models::player::{Player, PlayerTrait, PlayerAssert};
    use grimscape::models::dungeon::{Dungeon, DungeonTrait, DungeonAssert};
    use grimscape::models::room::{Room, RoomTrait, RoomAssert};
    use grimscape::models::adventurer::{Adventurer, AdventurerTrait, AdventurerAssert};
    use grimscape::models::mob::{Mob, MobTrait, MobAssert};
    use grimscape::types::beast::{Beast, BeastTrait};
    use grimscape::types::direction::Direction;
    use grimscape::helpers::seeder::Seeder;

    // Errors

    mod errors {
        const PLAYABLE_MOB_NOT_FOUND: felt252 = 'Playable: mob not found';
    }

    // Storage

    #[storage]
    struct Storage {}

    // Events

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {}

    #[generate_trait]
    impl InternalImpl<
        TContractState, +HasComponent<TContractState>
    > of InternalTrait<TContractState> {
        fn initialize(self: @ComponentState<TContractState>, world: IWorldDispatcher,) {
            // [Setup] Datastore
            let store: Store = StoreTrait::new(world);

            // [Effect] Create realm
            let mut realm = RealmTrait::new(REALM_ID);

            // [Effect] Create dungeon
            let dungeon_id = realm.spawn();
            let time = get_block_timestamp();
            let seed: felt252 = Seeder::reseed(time.into(), time.into());
            let dungeon = DungeonTrait::new(realm.id, dungeon_id, seed);

            // [Effect] Store dungeon
            store.set_dungeon(dungeon);

            // [Effect] Store realm
            store.set_realm(realm);
        }

        fn create(self: @ComponentState<TContractState>, world: IWorldDispatcher,) {
            // [Setup] Datastore
            let store: Store = StoreTrait::new(world);

            // [Check] Player exists
            let player_id: felt252 = get_caller_address().into();
            let mut player = store.get_player(player_id);
            player.assert_is_created();

            // [Check] Dungeon is not done
            let realm = store.get_realm(REALM_ID);
            let dungeon_id = realm.dungeon_count;
            let mut dungeon = store.get_dungeon(realm.id, dungeon_id);
            dungeon.assert_not_done();

            // [Check] Adventurer does not exist
            let adventurer = store.get_adventurer(realm.id, dungeon.id, player.adventurer_id);
            adventurer.assert_not_exists();

            // [Effect] Spawn adventurer
            let adventurer_id = dungeon.spawn_adventurer();
            let mut adventurer = AdventurerTrait::new(
                realm.id, dungeon.id, adventurer_id, dungeon.seed, player_id
            );
            player.start(adventurer_id);

            // [Effect] Spawn room and add adventurer
            let mut room = RoomTrait::new_spawn(
                realm.id, dungeon.id, adventurer.id, 0, 0, dungeon.seed
            );
            room.add(adventurer.position);

            // [Effect] Store entities
            store.set_room(room);
            store.set_adventurer(adventurer);
            store.set_dungeon(dungeon);
            store.set_player(player);
        }

        fn move(self: @ComponentState<TContractState>, world: IWorldDispatcher, direction: u8) {
            // [Setup] Datastore
            let mut store: Store = StoreTrait::new(world);

            // [Check] Player exists
            let player_id: felt252 = get_caller_address().into();
            let player = store.get_player(player_id);
            player.assert_is_created();

            // [Check] Dungeon is not done
            let realm = store.get_realm(REALM_ID);
            let dungeon_id = realm.dungeon_count;
            let dungeon = store.get_dungeon(realm.id, dungeon_id);
            dungeon.assert_not_done();

            // [Check] Adventurer is not dead
            let mut adventurer = store.get_adventurer(realm.id, dungeon.id, player.adventurer_id);
            adventurer.assert_not_dead();

            // [Effect] Move adventurer
            let mut room = store
                .get_room(realm.id, dungeon.id, adventurer.id, adventurer.x, adventurer.y);
            let from = adventurer.position;
            adventurer.move(direction.into());
            room.move(from, adventurer.position);

            // [Effect] Move mobs
            self.move_mobs(ref room, ref adventurer, ref store);

            // [Effect] Update entities
            store.set_room(room);
            store.set_adventurer(adventurer);
        }

        fn interact(self: @ComponentState<TContractState>, world: IWorldDispatcher, direction: u8) {
            // [Setup] Datastore
            let mut store: Store = StoreTrait::new(world);

            // [Check] Player exists
            let player_id: felt252 = get_caller_address().into();
            let player = store.get_player(player_id);
            player.assert_is_created();

            // [Check] Dungeon is not done
            let realm = store.get_realm(REALM_ID);
            let dungeon_id = realm.dungeon_count;
            let dungeon = store.get_dungeon(realm.id, dungeon_id);
            dungeon.assert_not_done();

            // [Check] Adventurer is not dead
            let mut adventurer = store.get_adventurer(realm.id, dungeon.id, player.adventurer_id);
            adventurer.assert_not_dead();

            // [Check] Entity to interact with exists
            let direction: Direction = direction.into();
            let mut room = store
                .get_room(realm.id, dungeon.id, adventurer.id, adventurer.x, adventurer.y);
            room.assert_can_interact(adventurer.position, direction);

            // [Effect] Attack the mob
            // TODO: manage different cases
            let target = room.next(adventurer.position, direction);
            let mut mob = store.search_mob(room, target).expect(errors::PLAYABLE_MOB_NOT_FOUND);
            mob.take(adventurer.damage());
            if mob.is_dead() {
                room.remove(target);
            }
            store.set_mob(mob);

            // [Effect] Move mobs
            self.move_mobs(ref room, ref adventurer, ref store);

            // [Effect] Update entities
            store.set_room(room);
            store.set_adventurer(adventurer);
        }

        fn explore(self: @ComponentState<TContractState>, world: IWorldDispatcher, direction: u8) {
            // [Setup] Datastore
            let mut store: Store = StoreTrait::new(world);

            // [Check] Player exists
            let player_id: felt252 = get_caller_address().into();
            let player = store.get_player(player_id);
            player.assert_is_created();

            // [Check] Dungeon is not done
            let realm = store.get_realm(REALM_ID);
            let dungeon_id = realm.dungeon_count;
            let dungeon = store.get_dungeon(realm.id, dungeon_id);
            dungeon.assert_not_done();

            // [Check] Adventurer is not dead
            let mut adventurer = store.get_adventurer(realm.id, dungeon.id, player.adventurer_id);
            adventurer.assert_not_dead();

            // [Check] The adventurer can leave the current room
            let direction: Direction = direction.into();
            let mut room = store
                .get_room(realm.id, dungeon.id, adventurer.id, adventurer.x, adventurer.y);
            room.assert_can_leave(adventurer.position, direction.into());

            // [Effect] Remove adventurer from the current room
            room.remove(adventurer.position);
            store.set_room(room);

            // [Effect] Explore the next room
            adventurer.explore(direction);

            // [Effect] Generate the new room if needed
            let mut room = store
                .get_room(realm.id, dungeon.id, adventurer.id, adventurer.x, adventurer.y);
            if !room.is_explored() {
                // [Effect] Update the adventurer seed
                adventurer.seed = Seeder::reseed(adventurer.seed, direction.into());
                // [Effect] Setup and Explore the room
                room.setup();
                room.explore(adventurer.seed);
                // [Effect] Add entities
                room.add(adventurer.position);
                let mut mobs = room.spawn_mobs();
                self.spawn_mobs(room, ref mobs, ref store);
            } else {
                // [Effect] Add new adventurer position
                // [Info] It panics if the position is already in use
                room.add(adventurer.position);
            }

            // [Effect] Update entities
            store.set_room(room);
            store.set_adventurer(adventurer);
        }
    }

    #[generate_trait]
    impl PrivateImpl<
        TContractState, +HasComponent<TContractState>
    > of PrivateTrait<TContractState> {
        #[inline]
        fn spawn_mobs(
            self: @ComponentState<TContractState>, room: Room, ref mobs: Array<u8>, ref store: Store
        ) {
            let mut mob_id = 1;
            while let Option::Some(position) = mobs.pop_front() {
                // [Effect] Create mob
                let seed = Seeder::reseed(room.seed, mob_id.into());
                let beast: Beast = BeastTrait::from(seed);
                let mut mob = MobTrait::new(
                    room.realm_id,
                    room.dungeon_id,
                    room.adventurer_id,
                    room.x,
                    room.y,
                    mob_id,
                    position,
                    beast
                );
                // [Effect] Store mob
                mob.setup(1, seed);
                store.set_mob(mob);
                mob_id += 1;
            };
        }

        #[inline]
        fn move_mobs(
            self: @ComponentState<TContractState>,
            ref room: Room,
            ref adventurer: Adventurer,
            ref store: Store
        ) {
            let mut mob_id = room.mob_count;
            while mob_id > 0 {
                // [Effect] Move mob
                let mut mob = store
                    .get_mob(room.realm_id, room.dungeon_id, adventurer.id, room.x, room.y, mob_id);
                let next = room.search_next(mob.position, adventurer.position);
                // [Effect] Attack if possible, otherwise move
                if next == adventurer.position {
                    adventurer.take(mob.damage());
                } else if next != mob.position && !mob.is_dead() {
                    room.move(mob.position, next);
                    mob.move(next);
                }
                // [Effect] Update mob
                store.set_mob(mob);
                mob_id -= 1;
            };
        }
    }
}
