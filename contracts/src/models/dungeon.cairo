// Internal imports

use grimscape::models::index::Dungeon;

// Errors

mod errors {
    const DUNGEON_NOT_CLAIMED: felt252 = 'Dungeon: not claimed';
    const DUNGEON_ALREADY_CLAIMED: felt252 = 'Dungeon: already claimed';
}

#[generate_trait]
impl DungeonImpl of DungeonTrait {
    #[inline]
    fn new(realm_id: u32, id: u32, seed: felt252) -> Dungeon {
        Dungeon { realm_id, id, nonce: 0, seed, claimer: 0, }
    }

    #[inline]
    fn is_claimed(self: Dungeon) -> bool {
        self.claimer != 0
    }

    #[inline]
    fn claim(ref self: Dungeon, claimer: felt252) {
        // [Check] Dungeon is not claimed
        self.assert_not_done();
        // [Effect] Claim the dungeon
        self.claimer = claimer;
    }

    #[inline]
    fn spawn_adventurer(ref self: Dungeon) -> u32 {
        self.nonce += 1;
        self.nonce
    }
}

#[generate_trait]
impl DungeonAssert of AssertTrait {
    #[inline]
    fn assert_is_claimed(self: Dungeon) {
        assert(self.is_claimed(), errors::DUNGEON_NOT_CLAIMED);
    }

    #[inline]
    fn assert_not_done(self: Dungeon) {
        assert(!self.is_claimed(), errors::DUNGEON_ALREADY_CLAIMED);
    }
}

#[cfg(test)]
mod tests {
    // Local imports

    use super::{Dungeon, DungeonTrait, AssertTrait};

    // Constants

    const REALM_ID: u32 = 1;
    const DUNGEON_ID: u32 = 1;
    const SEED: felt252 = 'SEED';
    const NAME: felt252 = 'Alice';

    #[test]
    fn test_dungeon_new() {
        let dungeon: Dungeon = DungeonTrait::new(REALM_ID, DUNGEON_ID, SEED);
        assert_eq!(dungeon.id, DUNGEON_ID);
        assert_eq!(dungeon.claimer, 0);
        assert_eq!(dungeon.is_claimed(), false);
    }

    #[test]
    fn test_dungeon_claim() {
        let mut dungeon: Dungeon = DungeonTrait::new(REALM_ID, DUNGEON_ID, SEED);
        dungeon.claim(NAME);
        assert_eq!(dungeon.claimer, NAME);
        assert_eq!(dungeon.is_claimed(), true);
    }
}
