import { Resource } from "../../types/resource";
import { BuildingInterface } from "./interface";

export const Gard: BuildingInterface = class Gard {
  public static requirement(): Resource {
    return new Resource(4, 2, 0, 2);
  }

  public static score(): number {
    return 4;
  }

  public static gold(): number {
    return 16;
  }
};
