import { Resource } from "../../types/resource";
import { BuildingInterface } from "./interface";

export const Stall: BuildingInterface = class Stall {
  public static requirement(): Resource {
    return new Resource(0, 3, 1, 3);
  }

  public static score(): number {
    return 3;
  }

  public static gold(): number {
    return 14;
  }
};
