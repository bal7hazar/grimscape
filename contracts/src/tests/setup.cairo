mod setup {
    // Core imports

    use core::debug::PrintTrait;

    // Starknet imports

    use starknet::ContractAddress;
    use starknet::testing::{set_contract_address, set_block_timestamp};

    // Dojo imports

    use dojo::world::{IWorldDispatcherTrait, IWorldDispatcher};
    use dojo::utils::test::{spawn_test_world};

    // Internal imports

    use grimscape::models::index;
    use grimscape::types::direction::Direction;
    use grimscape::helpers::seeder::Seeder;
    use grimscape::systems::actions::{
        Actions, IActions, IActionsDispatcher, IActionsDispatcherTrait
    };

    // Constants

    fn PLAYER() -> ContractAddress {
        starknet::contract_address_const::<'PLAYER'>()
    }

    const PLAYER_NAME: felt252 = 'PLAYER';

    #[derive(Drop)]
    struct Systems {
        actions: IActionsDispatcher,
    }

    #[derive(Drop)]
    struct Context {
        player_id: felt252,
        player_name: felt252,
    }

    #[inline]
    fn spawn_game() -> (IWorldDispatcher, Systems, Context) {
        // [Setup] World
        let models = array![
            index::player::TEST_CLASS_HASH,
            index::realm::TEST_CLASS_HASH,
            index::dungeon::TEST_CLASS_HASH,
            index::room::TEST_CLASS_HASH,
            index::adventurer::TEST_CLASS_HASH,
            index::mob::TEST_CLASS_HASH,
        ];
        let world = spawn_test_world(array!["grimscape"].span(), models.span());

        // [Setup] Systems
        let actions_address = world
            .deploy_contract('actions', Actions::TEST_CLASS_HASH.try_into().unwrap());
        let systems = Systems {
            actions: IActionsDispatcher { contract_address: actions_address },
        };
        world.grant_writer(dojo::utils::bytearray_hash(@"grimscape"), actions_address);
        world.grant_writer(dojo::utils::bytearray_hash(@"grimscape"), PLAYER());

        // [Setup] Initialize
        set_block_timestamp(1);
        world
            .init_contract(
                dojo::utils::selector_from_names(@"grimscape", @"Actions"), array![].span()
            );

        // [Setup] Context
        set_contract_address(PLAYER());
        systems.actions.signup(PLAYER_NAME);
        systems.actions.create();
        let context = Context { player_id: PLAYER().into(), player_name: PLAYER_NAME, };

        // [Return]
        (world, systems, context)
    }
}
