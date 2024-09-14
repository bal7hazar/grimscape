import { Resource } from "../../types/resource";
import { BuildingInterface } from "./interface";

export const Markedshall: BuildingInterface = class Markedshall {
  public static requirement(): Resource {
    return new Resource(0, 3, 2, 3);
  }

  public static score(): number {
    return 4;
  }

  public static gold(): number {
    return 16;
  }
};
