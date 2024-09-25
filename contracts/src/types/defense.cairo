// Constants

pub const DEFENSE_COUNT: u8 = 3;

// Types

#[derive(Copy, Drop)]
pub enum Defense {
    None,
    Metal,
    Hide,
    Cloth,
}

// Implementations

#[generate_trait]
impl DefenseImpl of DefenseTrait {
    #[inline]
    fn from(seed: felt252) -> Defense {
        let slot: u8 = (1_u256 + seed.into() % DEFENSE_COUNT.into()).try_into().unwrap();
        slot.into()
    }
}

impl IntoDefenseFelt252 of core::Into<Defense, felt252> {
    #[inline]
    fn into(self: Defense) -> felt252 {
        match self {
            Defense::None => 'NONE',
            Defense::Metal => 'METAL',
            Defense::Hide => 'HIDE',
            Defense::Cloth => 'CLOTH',
        }
    }
}

impl IntoDefenseU8 of core::Into<Defense, u8> {
    #[inline]
    fn into(self: Defense) -> u8 {
        match self {
            Defense::None => 0,
            Defense::Metal => 1,
            Defense::Hide => 2,
            Defense::Cloth => 3,
        }
    }
}

impl IntoU8Defense of core::Into<u8, Defense> {
    #[inline]
    fn into(self: u8) -> Defense {
        let card: felt252 = self.into();
        match card {
            0 => Defense::None,
            1 => Defense::Metal,
            2 => Defense::Hide,
            3 => Defense::Cloth,
            _ => Defense::None,
        }
    }
}

impl DefensePartialEq of core::PartialEq<Defense> {
    #[inline]
    fn eq(lhs: @Defense, rhs: @Defense) -> bool {
        let lhs: u8 = (*lhs).into();
        let rhs: u8 = (*rhs).into();
        lhs == rhs
    }

    #[inline]
    fn ne(lhs: @Defense, rhs: @Defense) -> bool {
        let lhs: u8 = (*lhs).into();
        let rhs: u8 = (*rhs).into();
        lhs != rhs
    }
}

impl DefensePrint of core::debug::PrintTrait<Defense> {
    #[inline]
    fn print(self: Defense) {
        let felt: felt252 = self.into();
        felt.print();
    }
}
