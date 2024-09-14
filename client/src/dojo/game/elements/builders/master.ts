import { BuilderInterface } from "@/dojo/game/elements/builders/interface";
import { Resource } from "@/dojo/game/types/resource";

export const Master: BuilderInterface = class Master {
  public static count(): number {
    return 8;
  }

  public static cost(): number {
    return 5;
  }

  public static resource(version: number): Resource {
    switch (version) {
      case 1:
        return new Resource(0, 2, 3, 0);
      case 2:
        return new Resource(0, 0, 3, 2);
      case 3:
        return new Resource(2, 3, 0, 0);
      case 4:
        return new Resource(0, 3, 2, 0);
      case 5:
        return new Resource(3, 2, 0, 0);
      case 6:
        return new Resource(3, 0, 0, 2);
      case 7:
        return new Resource(2, 0, 0, 3);
      case 8:
        return new Resource(0, 0, 2, 3);
      default:
        return new Resource(0, 0, 0, 0);
    }
  }
};
