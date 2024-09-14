import { Building } from "./building";
import { Builder, BuilderType } from "./builder";

export class BuildingDeck {
  public static getCount(): number {
    return 34;
  }

  public static get(id: number): Building {
    return Building.from(id);
  }

  public static getVersion(id: number): number {
    return 1;
  }
}

export class BuilderDeck {
  public static getCount(): number {
    return 42;
  }

  public static get(id: number): Builder {
    switch (id) {
      case 1:
        return new Builder(BuilderType.Trainee);
      case 2:
        return new Builder(BuilderType.Trainee);
      case 3:
        return new Builder(BuilderType.Trainee);
      case 4:
        return new Builder(BuilderType.Trainee);
      case 5:
        return new Builder(BuilderType.Trainee);
      case 6:
        return new Builder(BuilderType.Trainee);
      case 7:
        return new Builder(BuilderType.Worker);
      case 8:
        return new Builder(BuilderType.Worker);
      case 9:
        return new Builder(BuilderType.Worker);
      case 10:
        return new Builder(BuilderType.Worker);
      case 11:
        return new Builder(BuilderType.Worker);
      case 12:
        return new Builder(BuilderType.Worker);
      case 13:
        return new Builder(BuilderType.Worker);
      case 14:
        return new Builder(BuilderType.Worker);
      case 15:
        return new Builder(BuilderType.Worker);
      case 16:
        return new Builder(BuilderType.Worker);
      case 17:
        return new Builder(BuilderType.Worker);
      case 18:
        return new Builder(BuilderType.Worker);
      case 19:
        return new Builder(BuilderType.Expert);
      case 20:
        return new Builder(BuilderType.Expert);
      case 21:
        return new Builder(BuilderType.Expert);
      case 22:
        return new Builder(BuilderType.Expert);
      case 23:
        return new Builder(BuilderType.Expert);
      case 24:
        return new Builder(BuilderType.Expert);
      case 25:
        return new Builder(BuilderType.Expert);
      case 26:
        return new Builder(BuilderType.Expert);
      case 27:
        return new Builder(BuilderType.Expert);
      case 28:
        return new Builder(BuilderType.Expert);
      case 29:
        return new Builder(BuilderType.Expert);
      case 30:
        return new Builder(BuilderType.Expert);
      case 31:
        return new Builder(BuilderType.Expert);
      case 32:
        return new Builder(BuilderType.Expert);
      case 33:
        return new Builder(BuilderType.Expert);
      case 34:
        return new Builder(BuilderType.Expert);
      case 35:
        return new Builder(BuilderType.Master);
      case 36:
        return new Builder(BuilderType.Master);
      case 37:
        return new Builder(BuilderType.Master);
      case 38:
        return new Builder(BuilderType.Master);
      case 39:
        return new Builder(BuilderType.Master);
      case 40:
        return new Builder(BuilderType.Master);
      case 41:
        return new Builder(BuilderType.Master);
      case 42:
        return new Builder(BuilderType.Master);
      default:
        return new Builder(BuilderType.None);
    }
  }

  public static getVersion(id: number): number {
    switch (id) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 3:
        return 3;
      case 4:
        return 4;
      case 5:
        return 5;
      case 6:
        return 6;
      case 7:
        return 1;
      case 8:
        return 2;
      case 9:
        return 3;
      case 10:
        return 4;
      case 11:
        return 5;
      case 12:
        return 6;
      case 13:
        return 7;
      case 14:
        return 8;
      case 15:
        return 9;
      case 16:
        return 10;
      case 17:
        return 11;
      case 18:
        return 12;
      case 19:
        return 1;
      case 20:
        return 2;
      case 21:
        return 3;
      case 22:
        return 4;
      case 23:
        return 5;
      case 24:
        return 6;
      case 25:
        return 7;
      case 26:
        return 8;
      case 27:
        return 9;
      case 28:
        return 10;
      case 29:
        return 11;
      case 30:
        return 12;
      case 31:
        return 13;
      case 32:
        return 14;
      case 33:
        return 15;
      case 34:
        return 16;
      case 35:
        return 1;
      case 36:
        return 2;
      case 37:
        return 3;
      case 38:
        return 4;
      case 39:
        return 5;
      case 40:
        return 6;
      case 41:
        return 7;
      case 42:
        return 8;
      default:
        return 0;
    }
  }
}
