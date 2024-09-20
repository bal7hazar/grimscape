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
    fn emit_adventurer_update(self: Emitter, adventurer: Adventurer) {
        let _event = AdventurerUpdate { id: self.world.uuid(), adventurer, };
        emit!(self.world, (_event,));
    }

    #[inline]
    fn emit_adventurer_hit(self: Emitter, adventurer: Adventurer, mob: Mob) {
        let _event = AdventurerHit { id: self.world.uuid(), adventurer, mob, };
        emit!(self.world, (_event,));
    }

    #[inline]
    fn emit_mob_update(self: Emitter, mob: Mob) {
        let _event = MobUpdate { id: self.world.uuid(), mob, };
        emit!(self.world, (_event,));
    }

    #[inline]
    fn emit_mob_hit(self: Emitter, mob: Mob, adventurer: Adventurer) {
        let _event = MobHit { id: self.world.uuid(), mob, adventurer, };
        emit!(self.world, (_event,));
    }
}
