#[starknet::component]
mod PlayableComponent {
    // Starknet imports

    use starknet::info::{get_caller_address, get_block_timestamp};

    // Dojo imports

    use dojo::world::IWorldDispatcher;
    use dojo::world::IWorldDispatcherTrait;

    // External imports

    use origami_map::helpers::heap::{Heap, HeapTrait};

    // Internal imports

    use grimscape::constants::REALM_ID;
    use grimscape::store::{Store, StoreTrait};
    use grimscape::models::realm::{Realm, RealmTrait, RealmAssert};
    use grimscape::models::player::{Player, PlayerTrait, PlayerAssert};
    use grimscape::models::dungeon::{Dungeon, DungeonTrait, DungeonAssert};
    use grimscape::models::room::{Room, RoomTrait, RoomAssert};
    use grimscape::models::adventurer::{Adventurer, AdventurerTrait, AdventurerAssert};
    use grimscape::models::mob::{Mob, MobTrait, MobAssert, MobItem, MobPartialOrd};
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

        fn perform(self: @ComponentState<TContractState>, world: IWorldDispatcher, direction: u8) {
            // [Setup] Datastore
            let mut store: Store = StoreTrait::new(world);

            // [Check] Player exists
            let player_id: felt252 = get_caller_address().into();
            let mut player = store.get_player(player_id);
            player.assert_is_created();

            // [Check] Dungeon is not done
            let mut realm = store.get_realm(REALM_ID);
            let dungeon_id = realm.dungeon_count;
            let mut dungeon = store.get_dungeon(realm.id, dungeon_id);
            dungeon.assert_not_done();

            // [Check] Adventurer is not dead
            let mut adventurer = store.get_adventurer(realm.id, dungeon.id, player.adventurer_id);
            adventurer.assert_not_dead();

            // [Effect] Perform action
            let direction: Direction = direction.into();
            let mut room = store
                .get_room(realm.id, dungeon.id, adventurer.id, adventurer.x, adventurer.y);

            // [Effect] Perform an interaction is possible
            if room.can_interact(adventurer.position, direction) {
                return self
                    .interact(
                        direction, ref store, ref realm, ref dungeon, ref adventurer, ref room
                    );
            }

            // [Effect] Perform an exploration if possible
            if room.can_leave(adventurer.position, direction) {
                return self
                    .explore(
                        direction, ref store, ref realm, ref dungeon, ref adventurer, ref room
                    );
            }

            self.move(direction, ref store, ref realm, ref dungeon, ref adventurer, ref room)
        }
    }

    #[generate_trait]
    impl PrivateImpl<
        TContractState, +HasComponent<TContractState>
    > of PrivateTrait<TContractState> {
        #[inline]
        fn move(
            self: @ComponentState<TContractState>,
            direction: Direction,
            ref store: Store,
            ref realm: Realm,
            ref dungeon: Dungeon,
            ref adventurer: Adventurer,
            ref room: Room,
        ) {
            // [Effect] Move adventurer
            let from = adventurer.position;
            adventurer.move(direction.into());
            room.move(from, adventurer.position);

            // [Effect] Move mobs
            self.move_mobs(ref room, ref adventurer, ref store);

            // [Effect] Update entities
            store.set_room(room);
            store.set_adventurer(adventurer);
        }

        #[inline]
        fn interact(
            self: @ComponentState<TContractState>,
            direction: Direction,
            ref store: Store,
            ref realm: Realm,
            ref dungeon: Dungeon,
            ref adventurer: Adventurer,
            ref room: Room,
        ) {
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

        #[inline]
        fn explore(
            self: @ComponentState<TContractState>,
            direction: Direction,
            ref store: Store,
            ref realm: Realm,
            ref dungeon: Dungeon,
            ref adventurer: Adventurer,
            ref room: Room,
        ) {
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
            let mut heap: Heap<Mob> = HeapTrait::<Mob>::new();
            let mut mob_id = room.mob_count;
            // [Compute] Find all mobs and sort by distance to target
            while mob_id > 0 {
                // [Compute] Path to adventurer
                let mut mob = store
                    .get_mob(room.realm_id, room.dungeon_id, adventurer.id, room.x, room.y, mob_id);
                // [Check] Mob is not dead, otherwise skip
                if mob.is_dead() {
                    mob_id -= 1;
                    continue;
                }
                let mut path = room.search_path(mob.position, adventurer.position);
                // [Check] Path is not empty, otherwise skip
                if path.len() == 0 {
                    mob_id -= 1;
                    continue;
                }
                mob.distance = path.len().try_into().unwrap();
                mob.next = *path.pop_back().unwrap();
                heap.add(mob);
                mob_id -= 1;
            };
            // [Effect] Perform action for each mob
            while let Option::Some(mut mob) = heap.pop_front() {
                // [Effect] Get next position and reset distance
                let next = mob.next;
                mob.distance = 0;
                mob.next = 0;
                // [Effect] If the mob is blocked, skip
                if next == mob.position {
                    continue;
                }
                // [Effect] Attack if the next position is the same as the adventurer
                if next == adventurer.position {
                    adventurer.take(mob.damage());
                    continue;
                }
                // [Effect] Move mob
                let position = room.move(mob.position, next);
                mob.move(position);
                // [Effect] Update mob
                store.set_mob(mob);
            };
        }
    }
}
