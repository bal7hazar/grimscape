//! Store struct and component management methods.

// Dojo imports

use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};

// Models imports

use grimscape::models::realm::Realm;
use grimscape::models::player::Player;
use grimscape::models::dungeon::Dungeon;
use grimscape::models::room::Room;
use grimscape::models::adventurer::Adventurer;
use grimscape::models::mob::Mob;

// Structs

#[derive(Copy, Drop)]
struct Store {
    world: IWorldDispatcher,
}

// Implementations

#[generate_trait]
impl StoreImpl of StoreTrait {
    #[inline]
    fn new(world: IWorldDispatcher) -> Store {
        Store { world: world }
    }

    #[inline]
    fn get_realm(self: Store, realm_id: u32) -> Realm {
        get!(self.world, realm_id, (Realm))
    }

    #[inline]
    fn get_player(self: Store, player_id: felt252) -> Player {
        get!(self.world, player_id, (Player))
    }

    #[inline]
    fn get_dungeon(self: Store, realm_id: u32, dungeon_id: u32) -> Dungeon {
        get!(self.world, (realm_id, dungeon_id), (Dungeon))
    }

    #[inline]
    fn get_adventurer(
        self: Store, realm_id: u32, dungeon_id: u32, adventurer_id: u32
    ) -> Adventurer {
        get!(self.world, (realm_id, dungeon_id, adventurer_id), (Adventurer))
    }

    #[inline]
    fn get_room(
        self: Store, realm_id: u32, dungeon_id: u32, adventurer_id: u32, x: i32, y: i32
    ) -> Room {
        get!(self.world, (realm_id, dungeon_id, adventurer_id, x, y), (Room))
    }

    #[inline]
    fn get_mob(
        self: Store, realm_id: u32, dungeon_id: u32, adventurer_id: u32, x: i32, y: i32, mob_id: u8
    ) -> Mob {
        get!(self.world, (realm_id, dungeon_id, adventurer_id, x, y, mob_id), (Mob))
    }

    #[inline]
    fn set_realm(self: Store, realm: Realm) {
        set!(self.world, (realm))
    }

    #[inline]
    fn set_player(self: Store, player: Player) {
        set!(self.world, (player))
    }

    #[inline]
    fn set_dungeon(self: Store, dungeon: Dungeon) {
        set!(self.world, (dungeon))
    }

    #[inline]
    fn set_adventurer(self: Store, adventurer: Adventurer) {
        set!(self.world, (adventurer))
    }

    #[inline]
    fn set_room(self: Store, room: Room) {
        set!(self.world, (room))
    }

    #[inline]
    fn set_mob(self: Store, mob: Mob) {
        set!(self.world, (mob))
    }

    #[inline]
    fn search_mob(self: Store, room: Room, position: u8,) -> Option<Mob> {
        let mut mob_id = room.mob_count;
        loop {
            if mob_id == 0 {
                break Option::None;
            }
            let mob = self
                .get_mob(
                    room.realm_id, room.dungeon_id, room.adventurer_id, room.x, room.y, mob_id
                );
            if mob.position == position {
                break Option::Some(mob);
            }
        }
    }
}
