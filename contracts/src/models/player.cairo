// Internal imports

use grimscape::models::index::Player;

mod errors {
    const PLAYER_NOT_CREATED: felt252 = 'Player: does not exist';
    const PLAYER_ALREADY_CREATED: felt252 = 'Player: already exist';
    const PLAYER_INVALID_NAME: felt252 = 'Player: invalid name';
    const PLAYER_NOT_STARTED: felt252 = 'Player: has already started';
    const PLAYER_ALREADY_STARTED: felt252 = 'Player: has not sarted';
}

#[generate_trait]
impl PlayerImpl of PlayerTrait {
    #[inline]
    fn new(id: felt252, name: felt252) -> Player {
        // [Check] Name is valid
        assert(name != 0, errors::PLAYER_INVALID_NAME);
        // [Return] Player
        Player { id, adventurer_id: 0, name }
    }

    #[inline]
    fn rename(ref self: Player, name: felt252) {
        // [Check] Name is valid
        assert(name != 0, errors::PLAYER_INVALID_NAME);
        // [Effect] Change the name
        self.name = name;
    }

    #[inline]
    fn start(ref self: Player, adventurer_id: u32) {
        // [Check] Player has not started
        self.assert_not_started();
        // [Effect] Update team id
        self.adventurer_id = adventurer_id;
    }

    #[inline]
    fn surrender(ref self: Player) {
        // [Check] Player has started
        self.assert_has_started();
        // [Effect] Update team id
        self.adventurer_id = 0;
    }
}

#[generate_trait]
impl PlayerAssert of AssertTrait {
    #[inline]
    fn assert_is_created(self: Player) {
        assert(0 != self.name, errors::PLAYER_NOT_CREATED);
    }

    #[inline]
    fn assert_not_created(self: Player) {
        assert(0 == self.name, errors::PLAYER_ALREADY_CREATED);
    }

    #[inline]
    fn assert_has_started(self: Player) {
        assert(0 != self.adventurer_id, errors::PLAYER_NOT_STARTED);
    }

    #[inline]
    fn assert_not_started(self: Player) {
        assert(0 == self.adventurer_id, errors::PLAYER_ALREADY_STARTED);
    }
}

#[cfg(test)]
mod tests {
    // Local imports

    use super::{Player, PlayerTrait};

    // Constants

    const ID: felt252 = 'ID';
    const PLAYER_NAME: felt252 = 'Alice';
    const PLAYER_NEW_NAME: felt252 = 'Bob';

    #[test]
    fn test_player_new() {
        let player = PlayerTrait::new(ID, PLAYER_NAME);
        assert_eq!(player.id, ID);
        assert_eq!(player.name, PLAYER_NAME);
    }

    #[test]
    fn test_player_rename() {
        let mut player = PlayerTrait::new(ID, PLAYER_NAME);
        player.rename(PLAYER_NEW_NAME);
        assert_eq!(player.name, PLAYER_NEW_NAME);
    }
}
