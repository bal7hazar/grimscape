export enum DirectionType {
  None = "None",
  NorthWest = "NorthWest",
  North = "North",
  NorthEast = "NorthEast",
  East = "East",
  SouthEast = "SouthEast",
  South = "South",
  SouthWest = "SouthWest",
  West = "West",
}

export class Direction {
  public value: DirectionType;

  constructor(direction: DirectionType) {
    this.value = direction;
  }

  public into(): number {
    switch (this.value) {
        case DirectionType.NorthWest:
            return 0;
        case DirectionType.North:
            return 1;
        case DirectionType.NorthEast:
            return 0;
        case DirectionType.East:
            return 2;
        case DirectionType.SouthEast:
            return 0;
        case DirectionType.South:
            return 3;
        case DirectionType.SouthWest:
            return 0;
        case DirectionType.West:
            return 4;
        default:
            return 0;
        }
  }

  public static from(index: number): Direction {
    switch (index) {
      case 0:
        return new Direction(DirectionType.None);
      case 1:
        return new Direction(DirectionType.North);
      case 2:
        return new Direction(DirectionType.East);
      case 3:
        return new Direction(DirectionType.South);
      case 4:
        return new Direction(DirectionType.West);
      default:
        return new Direction(DirectionType.None);
    }
  }

  public static between(from: number, to: number) {
    const delta = to - from;
    if (delta === 1) {
      return new Direction(DirectionType.West);
    } else if (delta === -1) {
      return new Direction(DirectionType.East);
    } else if (delta > 0) {
      return new Direction(DirectionType.North);
    } else if (delta < 0) {
      return new Direction(DirectionType.South);
    } else {
      console.error("Invalid direction");
      return new Direction(DirectionType.None);
    }
  }

  public next(position: number, width: number): number {
    switch (this.value) {
        case DirectionType.NorthWest:
            return position + width + 1;
        case DirectionType.North:
            return position + width;
        case DirectionType.NorthEast:
            return position + width - 1;
        case DirectionType.East:
            return position - 1;
        case DirectionType.SouthEast:
            return position - width - 1;
        case DirectionType.South:
            return position - width;
        case DirectionType.SouthWest:
            return position - width + 1;
        case DirectionType.West:
            return position + 1;
        default:
            return position;
        }
  }

  public static extract(positions: { x: number, y: number }[]) {
    // For each position, extract the direction, the result length is positions.length - 1
    const directions: Direction[] = [];
    for (let i = 0; i < positions.length - 1; i++) {
        const current = positions[i];
        const next = positions[i + 1];
        const dx = next.x - current.x;
        const dy = next.y - current.y;
        if (dx * dy != 0) {
          console.error("Invalid direction");
          continue;
        }
        if (dx > 0) {
          const direction = new Direction(DirectionType.East)
          directions.push(direction);
        } else if (dx < 0) {
          const direction = new Direction(DirectionType.West)
          directions.push(direction);
        } else if (dy > 0) {
          const direction = new Direction(DirectionType.South)
          directions.push(direction);
        } else if (dy < 0) {
          const direction = new Direction(DirectionType.North)
          directions.push(direction);
        }
    }
    return directions;
  }
}