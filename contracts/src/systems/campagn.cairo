// Starknet imports

use starknet::ContractAddress;

// Dojo imports

use dojo::world::IWorldDispatcher;

// Interfaces

#[starknet::interface]
trait ICampagn<TContractState> {
    fn signup(self: @TContractState, name: felt252);
    fn rename(self: @TContractState, name: felt252);
    fn create(self: @TContractState);
    fn perform(self: @TContractState, direction: u8);
}

// Contracts

#[dojo::contract]
mod campagn {
    // Component imports

    use grimscape::components::signable::SignableComponent;
    use grimscape::components::playable::PlayableComponent;

    // Local imports

    use super::ICampagn;

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
    impl CampagnImpl of ICampagn<ContractState> {
        fn signup(self: @ContractState, name: felt252) {
            self.signable.signup(self.world(), name)
        }

        fn rename(self: @ContractState, name: felt252) {
            self.signable.rename(self.world(), name)
        }

        fn create(self: @ContractState) {
            self.playable.create(self.world())
        }

        fn perform(self: @ContractState, direction: u8) {
            self.playable.perform(self.world(), direction)
        }
    }
}
