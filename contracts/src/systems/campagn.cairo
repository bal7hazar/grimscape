// Starknet imports

use starknet::ContractAddress;

// Dojo imports

use dojo::world::IWorldDispatcher;

// Interfaces

#[starknet::interface]
trait IActions<TContractState> {
    fn signup(self: @TContractState, name: felt252);
    fn rename(self: @TContractState, name: felt252);
    fn create(self: @TContractState);
    fn move(self: @TContractState, direction: u8);
    fn interact(self: @TContractState, direction: u8);
    fn explore(self: @TContractState, direction: u8);
}

// Contracts

#[dojo::contract]
mod actions {
    // Component imports

    use grimscape::components::signable::SignableComponent;
    use grimscape::components::playable::PlayableComponent;

    // Local imports

    use super::IActions;

    // Components

    component!(path: SignableComponent, storage: signable, event: SignableEvent);
    impl SignableInternalImpl = SignableComponent::InternalImpl<ContractState>;
    component!(path: PlayableComponent, storage: playable, event: PlayableEvent);
    impl PlayableInternalImpl = PlayableComponent::InternalImpl<ContractState>;

    // Storage

    #[storage]
    struct Storage {
        #[substorage(v0)]
        signable: SignableComponent::Storage,
        #[substorage(v0)]
        playable: PlayableComponent::Storage,
    }

    // Events

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        SignableEvent: SignableComponent::Event,
        #[flat]
        PlayableEvent: PlayableComponent::Event,
    }

    // Constructor

    fn dojo_init(world: @IWorldDispatcher,) {
        self.playable.initialize(world);
    }

    // Implementations

    #[abi(embed_v0)]
    impl ActionsImpl of IActions<ContractState> {
        fn signup(self: @ContractState, name: felt252) {
            self.signable.signup(self.world(), name)
        }

        fn rename(self: @ContractState, name: felt252) {
            self.signable.rename(self.world(), name)
        }

        fn create(self: @ContractState) {
            self.playable.create(self.world())
        }

        fn move(self: @ContractState, direction: u8) {
            self.playable.move(self.world(), direction)
        }

        fn interact(self: @ContractState, direction: u8) {
            self.playable.interact(self.world(), direction)
        }

        fn explore(self: @ContractState, direction: u8) {
            self.playable.explore(self.world(), direction)
        }
    }
}
