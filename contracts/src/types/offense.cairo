// Constants

pub const OFFENSE_COUNT: u8 = 3;

// Types

#[derive(Copy, Drop)]
pub enum Offense {
    None,
    Blade,
    Bludgeon,
    Magic,
}

// Implementations

#[generate_trait]
impl OffenseImpl of OffenseTrait {
    #[inline]
    fn from(seed: felt252) -> Offense {
        let slot: u8 = (1_u256 + seed.into() % OFFENSE_COUNT.into()).try_into().unwrap();
        slot.into()
    }
}

impl IntoOffenseFelt252 of core::Into<Offense, felt252> {
    #[inline]
    fn into(self: Offense) -> felt252 {
        match self {
            Offense::None => 'NONE',
            Offense::Blade => 'BLADE',
            Offense::Bludgeon => 'BLUDGEON',
            Offense::Magic => 'MAGIC',
        }
    }
}

impl IntoOffenseU8 of core::Into<Offense, u8> {
    #[inline]
    fn into(self: Offense) -> u8 {
        match self {
            Offense::None => 0,
            Offense::Blade => 1,
            Offense::Bludgeon => 2,
            Offense::Magic => 3,
        }
    }
}

impl IntoU8Offense of core::Into<u8, Offense> {
    #[inline]
    fn into(self: u8) -> Offense {
        let card: felt252 = self.into();
        match card {
            0 => Offense::None,
            1 => Offense::Blade,
            2 => Offense::Bludgeon,
            3 => Offense::Magic,
            _ => Offense::None,
        }
    }
}

impl OffensePartialEq of core::PartialEq<Offense> {
    #[inline]
    fn eq(lhs: @Offense, rhs: @Offense) -> bool {
        let lhs: u8 = (*lhs).into();
        let rhs: u8 = (*rhs).into();
        lhs == rhs
    }

    #[inline]
    fn ne(lhs: @Offense, rhs: @Offense) -> bool {
        let lhs: u8 = (*lhs).into();
        let rhs: u8 = (*rhs).into();
        lhs != rhs
    }
}

impl OffensePrint of core::debug::PrintTrait<Offense> {
    #[inline]
    fn print(self: Offense) {
        let felt: felt252 = self.into();
        felt.print();
    }
}
