//! Fast power algorithm

mod errors {
    const MATH_INVALID_INPUT: felt252 = 'Math: invalid input';
    const MATH_INVALID_SIZE: felt252 = 'Math: invalid size';
}

#[generate_trait]
impl Math of MathTrait {
    fn fast_power<
        T,
        +Div<T>,
        +Rem<T>,
        +Into<u8, T>,
        +Into<T, u256>,
        +TryInto<u256, T>,
        +PartialEq<T>,
        +Copy<T>,
        +Drop<T>
    >(
        base: T, mut power: T
    ) -> T {
        assert(base != 0_u8.into(), errors::MATH_INVALID_INPUT);

        let mut base: u256 = base.into();
        let mut result: u256 = 1;

        loop {
            if power % 2_u8.into() != 0_u8.into() {
                result *= base;
            }
            power = power / 2_u8.into();
            if (power == 0_u8.into()) {
                break;
            }
            base *= base;
        };

        result.try_into().expect(errors::MATH_INVALID_SIZE)
    }
}
