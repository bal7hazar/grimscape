// Dojo imports

use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};

// Starknet imports

use starknet::SyscallResultTrait;

// Internal imports

use grimscape::models::adventurer::Adventurer;
use grimscape::models::mob::Mob;
use grimscape::events::{AdventurerUpdate, AdventurerHit, MobUpdate, MobHit};

// Structs

#[derive(Copy, Drop)]
struct Emitter {
    world: IWorldDispatcher,
}

// Implementations

#[generate_trait]
impl EmitterImpl of EmitterTrait {
    #[inline]
    fn new(world: IWorldDispatcher) -> Emitter {
        Emitter { world: world }
    }

    #[inline]
    fn emit_adventurer_update(self: Emitter, adventurer: Adventurer, direction: u8, time: u64) {
        let _event = AdventurerUpdate { id: self.world.uuid(), adventurer, direction, time };
        emit!(self.world, (_event,));
    }

    #[inline]
    fn emit_adventurer_hit(
        self: Emitter, adventurer: Adventurer, mob: Mob, damage: u16, direction: u8, time: u64
    ) {
        let _event = AdventurerHit {
            id: self.world.uuid(), adventurer, mob, damage, direction, time
        };
        emit!(self.world, (_event,));
    }

    #[inline]
    fn emit_mob_update(self: Emitter, mob: Mob, direction: u8, time: u64) {
        let _event = MobUpdate { id: self.world.uuid(), mob, direction, time };
        emit!(self.world, (_event,));
    }

    #[inline]
    fn emit_mob_hit(self: Emitter, mob: Mob, damage: u16, direction: u8, time: u64) {
        let _event = MobHit { id: self.world.uuid(), mob, damage, direction, time };
        emit!(self.world, (_event,));
    }
}
