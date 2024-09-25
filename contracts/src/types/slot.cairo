// Constants

pub const SLOT_COUNT: u8 = 8;

// Types

#[derive(Copy, Drop)]
pub enum Slot {
    None,
    Weapon,
    Chest,
    Head,
    Waist,
    Foot,
    Hand,
    Neck,
    Ring,
}

// Implementations

#[generate_trait]
impl SlotImpl of SlotTrait {
    #[inline]
    fn from(seed: felt252) -> Slot {
        let slot: u8 = (1_u256 + seed.into() % SLOT_COUNT.into()).try_into().unwrap();
        slot.into()
    }
}

impl IntoSlotFelt252 of core::Into<Slot, felt252> {
    #[inline]
    fn into(self: Slot) -> felt252 {
        match self {
            Slot::None => 'NONE',
            Slot::Weapon => 'WEAPON',
            Slot::Chest => 'CHEST',
            Slot::Head => 'HEAD',
            Slot::Waist => 'WAIST',
            Slot::Foot => 'FOOT',
            Slot::Hand => 'HAND',
            Slot::Neck => 'NECK',
            Slot::Ring => 'RING',
        }
    }
}

impl IntoSlotU8 of core::Into<Slot, u8> {
    #[inline]
    fn into(self: Slot) -> u8 {
        match self {
            Slot::None => 0,
            Slot::Weapon => 1,
            Slot::Chest => 2,
            Slot::Head => 3,
            Slot::Waist => 4,
            Slot::Foot => 5,
            Slot::Hand => 6,
            Slot::Neck => 7,
            Slot::Ring => 8,
        }
    }
}

impl IntoU8Slot of core::Into<u8, Slot> {
    #[inline]
    fn into(self: u8) -> Slot {
        let card: felt252 = self.into();
        match card {
            0 => Slot::None,
            1 => Slot::Weapon,
            2 => Slot::Chest,
            3 => Slot::Head,
            4 => Slot::Waist,
            5 => Slot::Foot,
            6 => Slot::Hand,
            7 => Slot::Neck,
            8 => Slot::Ring,
            _ => Slot::None,
        }
    }
}

impl SlotPartialEq of core::PartialEq<Slot> {
    #[inline]
    fn eq(lhs: @Slot, rhs: @Slot) -> bool {
        let lhs: u8 = (*lhs).into();
        let rhs: u8 = (*rhs).into();
        lhs == rhs
    }

    #[inline]
    fn ne(lhs: @Slot, rhs: @Slot) -> bool {
        let lhs: u8 = (*lhs).into();
        let rhs: u8 = (*rhs).into();
        lhs != rhs
    }
}

impl SlotPrint of core::debug::PrintTrait<Slot> {
    #[inline]
    fn print(self: Slot) {
        let felt: felt252 = self.into();
        felt.print();
    }
}
