#[derive(Copy, Drop)]
enum Direction {
    None,
    North,
    East,
    South,
    West,
}

impl IntoDirectionFelt252 of core::Into<Direction, felt252> {
    #[inline]
    fn into(self: Direction) -> felt252 {
        match self {
            Direction::None => 'NONE',
            Direction::North => 'NORTH',
            Direction::East => 'EAST',
            Direction::South => 'SOUTH',
            Direction::West => 'WEST',
        }
    }
}

impl IntoDirectionU8 of core::Into<Direction, u8> {
    #[inline]
    fn into(self: Direction) -> u8 {
        match self {
            Direction::None => 0,
            Direction::North => 1,
            Direction::East => 2,
            Direction::South => 3,
            Direction::West => 4,
        }
    }
}

impl IntoU8Direction of core::Into<u8, Direction> {
    #[inline]
    fn into(self: u8) -> Direction {
        let card: felt252 = self.into();
        match card {
            0 => Direction::None,
            1 => Direction::North,
            2 => Direction::East,
            3 => Direction::South,
            4 => Direction::West,
            _ => Direction::None,
        }
    }
}

impl DirectionPrint of core::debug::PrintTrait<Direction> {
    #[inline]
    fn print(self: Direction) {
        let felt: felt252 = self.into();
        felt.print();
    }
}
