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

  public from(index: number): Direction {
    const direction = Object.values(DirectionType)[index];
    return new Direction(direction);
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
}