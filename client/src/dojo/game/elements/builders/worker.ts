import { BuilderInterface } from "@/dojo/game/elements/builders/interface";
import { Resource } from "@/dojo/game/types/resource";

export const Worker: BuilderInterface = class Worker {
  public static count(): number {
    return 12;
  }

  public static cost(): number {
    return 3;
  }

  public static resource(version: number): Resource {
    switch (version) {
      case 1:
        return new Resource(2, 1, 0, 0);
      case 2:
        return new Resource(2, 0, 1, 0);
      case 3:
        return new Resource(2, 0, 0, 1);
      case 4:
        return new Resource(1, 2, 0, 0);
      case 5:
        return new Resource(0, 2, 1, 0);
      case 6:
        return new Resource(0, 2, 0, 1);
      case 7:
        return new Resource(1, 0, 2, 0);
      case 8:
        return new Resource(0, 1, 2, 0);
      case 9:
        return new Resource(0, 0, 2, 1);
      case 10:
        return new Resource(1, 0, 0, 2);
      case 11:
        return new Resource(0, 1, 0, 2);
      case 12:
        return new Resource(0, 0, 1, 2);
      default:
        return new Resource(0, 0, 0, 0);
    }
  }
};
