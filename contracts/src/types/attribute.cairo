// Constants

pub const ATTRIBUTE_COUNT: u8 = 6;

// Types

#[derive(Copy, Drop)]
pub enum Attribute {
    None,
    Strength,
    Dexterity,
    Vitality,
    Intelligence,
    Wisdom,
    Charisma,
}

// Errors

mod errors {
    pub const ATTRIBUTE_INVALID_VALUE: felt252 = 'Attribute: invalid value';
}

// Implementations

#[generate_trait]
impl AttributeImpl of AttributeTrait {
    #[inline]
    fn from(seed: felt252) -> Attribute {
        let slot: u8 = (1_u256 + seed.into() % ATTRIBUTE_COUNT.into()).try_into().unwrap();
        slot.into()
    }

    #[inline]
    fn index(self: Attribute) -> u8 {
        self.into() - 1
    }
}

#[generate_trait]
impl AttributeAssert of AssertTrait {
    #[inline]
    fn assert_is_valid(self: Attribute) {
        assert(self != Attribute::None, errors::ATTRIBUTE_INVALID_VALUE);
    }
}


impl IntoAttributeFelt252 of core::Into<Attribute, felt252> {
    #[inline]
    fn into(self: Attribute) -> felt252 {
        match self {
            Attribute::None => 'NONE',
            Attribute::Strength => 'STRENGTH',
            Attribute::Dexterity => 'DEXTERITY',
            Attribute::Vitality => 'VITALITY',
            Attribute::Intelligence => 'INTELLIGENCE',
            Attribute::Wisdom => 'WISDOM',
            Attribute::Charisma => 'CHARISMA',
        }
    }
}

impl IntoAttributeU8 of core::Into<Attribute, u8> {
    #[inline]
    fn into(self: Attribute) -> u8 {
        match self {
            Attribute::None => 0,
            Attribute::Strength => 1,
            Attribute::Dexterity => 2,
            Attribute::Vitality => 3,
            Attribute::Intelligence => 4,
            Attribute::Wisdom => 5,
            Attribute::Charisma => 6,
        }
    }
}

impl IntoU8Attribute of core::Into<u8, Attribute> {
    #[inline]
    fn into(self: u8) -> Attribute {
        let card: felt252 = self.into();
        match card {
            0 => Attribute::None,
            1 => Attribute::Strength,
            2 => Attribute::Dexterity,
            3 => Attribute::Vitality,
            4 => Attribute::Intelligence,
            5 => Attribute::Wisdom,
            6 => Attribute::Charisma,
            _ => Attribute::None,
        }
    }
}

impl AttributePartialEq of core::PartialEq<Attribute> {
    #[inline]
    fn eq(lhs: @Attribute, rhs: @Attribute) -> bool {
        let lhs: u8 = (*lhs).into();
        let rhs: u8 = (*rhs).into();
        lhs == rhs
    }

    #[inline]
    fn ne(lhs: @Attribute, rhs: @Attribute) -> bool {
        let lhs: u8 = (*lhs).into();
        let rhs: u8 = (*rhs).into();
        lhs != rhs
    }
}

impl AttributePrint of core::debug::PrintTrait<Attribute> {
    #[inline]
    fn print(self: Attribute) {
        let felt: felt252 = self.into();
        felt.print();
    }
}
