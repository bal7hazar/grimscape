import { BuilderInterface } from "@/dojo/game/elements/builders/interface";
import { Resource } from "@/dojo/game/types/resource";

export const Trainee: BuilderInterface = class Trainee {
  public static count(): number {
    return 6;
  }

  public static cost(): number {
    return 2;
  }

  public static resource(version: number): Resource {
    switch (version) {
      case 1:
        return new Resource(0, 1, 1, 0);
      case 2:
        return new Resource(0, 0, 1, 1);
      case 3:
        return new Resource(0, 1, 0, 1);
      case 4:
        return new Resource(1, 0, 1, 0);
      case 5:
        return new Resource(1, 1, 0, 0);
      case 6:
        return new Resource(1, 0, 0, 1);
      default:
        return new Resource(0, 0, 0, 0);
    }
  }
};
