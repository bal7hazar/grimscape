import { BuilderInterface } from "@/dojo/game/elements/builders/interface";
import { Resource } from "@/dojo/game/types/resource";

export const Expert: BuilderInterface = class Expert {
  public static count(): number {
    return 16;
  }

  public static cost(): number {
    return 4;
  }

  public static resource(version: number): Resource {
    switch (version) {
      case 1:
        return new Resource(1, 1, 1, 1);
      case 2:
        return new Resource(1, 1, 1, 1);
      case 3:
        return new Resource(3, 1, 0, 0);
      case 4:
        return new Resource(0, 3, 0, 1);
      case 5:
        return new Resource(1, 0, 3, 0);
      case 6:
        return new Resource(0, 0, 1, 3);
      case 7:
        return new Resource(2, 2, 0, 0);
      case 8:
        return new Resource(2, 0, 2, 0);
      case 9:
        return new Resource(2, 0, 0, 2);
      case 10:
        return new Resource(0, 2, 2, 0);
      case 11:
        return new Resource(0, 2, 0, 2);
      case 12:
        return new Resource(0, 0, 2, 2);
      case 13:
        return new Resource(2, 1, 1, 0);
      case 14:
        return new Resource(1, 2, 0, 1);
      case 15:
        return new Resource(1, 0, 2, 1);
      case 16:
        return new Resource(0, 1, 1, 2);
      default:
        return new Resource(0, 0, 0, 0);
    }
  }
};
