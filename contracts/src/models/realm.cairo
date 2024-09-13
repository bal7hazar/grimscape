// Internal imports

use grimscape::models::index::Realm;

// Errors

mod errors {}

#[generate_trait]
impl RealmImpl of RealmTrait {
    #[inline]
    fn new(id: u32) -> Realm {
        // [Return] Realm
        Realm { id, dungeon_count: 0 }
    }

    #[inline]
    fn spawn(ref self: Realm) -> u32 {
        // [Effect] Increase dungeon id
        self.dungeon_count += 1;
        // [Return] Dungeon id
        self.dungeon_count
    }
}

#[generate_trait]
impl RealmAssert of AssertTrait {}

#[cfg(test)]
mod tests {
    // Local imports

    use super::{Realm, RealmTrait};

    // Constants

    const REALMS_ID: u32 = 1;

    #[test]
    fn test_realms_new() {
        let realms = RealmTrait::new(REALMS_ID);
        assert_eq!(realms.id, REALMS_ID);
        assert_eq!(realms.dungeon_count, 0);
    }

    #[test]
    fn test_realms_spawn() {
        let mut realms = RealmTrait::new(REALMS_ID);
        assert_eq!(realms.spawn(), 1);
        assert_eq!(realms.spawn(), 2);
    }
}
