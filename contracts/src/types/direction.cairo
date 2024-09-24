#[derive(Copy, Drop)]
enum Direction {
    None,
    North,
    East,
    South,
    West,
}

#[generate_trait]
impl DirectionImpl of DirectionTrait {
    #[inline]
    fn from(from: u8, to: u8) -> Direction {
        if from + 1 == to {
            Direction::West
        } else if from == to + 1 {
            Direction::East
        } else if from < to {
            Direction::North
        } else if from > to {
            Direction::South
        } else {
            Direction::None
        }
    }
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

impl DirectionPartialEq of core::PartialEq<Direction> {
    #[inline]
    fn eq(lhs: @Direction, rhs: @Direction) -> bool {
        let lhs: u8 = (*lhs).into();
        let rhs: u8 = (*rhs).into();
        lhs == rhs
    }

    #[inline]
    fn ne(lhs: @Direction, rhs: @Direction) -> bool {
        let lhs: u8 = (*lhs).into();
        let rhs: u8 = (*rhs).into();
        lhs != rhs
    }
}

impl DirectionPrint of core::debug::PrintTrait<Direction> {
    #[inline]
    fn print(self: Direction) {
        let felt: felt252 = self.into();
        felt.print();
    }
}

#[cfg(test)]
mod tests {
    // Local imports

    use super::{Direction, DirectionTrait};

    #[test]
    fn test_direction_from() {
        assert_eq!(DirectionTrait::from(1, 2) == Direction::West, true);
        assert_eq!(DirectionTrait::from(2, 1) == Direction::East, true);
        assert_eq!(DirectionTrait::from(1, 1) == Direction::None, true);
        assert_eq!(DirectionTrait::from(1, 3) == Direction::North, true);
        assert_eq!(DirectionTrait::from(3, 1) == Direction::South, true);
    }
}
