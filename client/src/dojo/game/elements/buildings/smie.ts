import { Resource } from "../../types/resource";
import { BuildingInterface } from "./interface";

export const Smie: BuildingInterface = class Smie {
  public static requirement(): Resource {
    return new Resource(2, 2, 0, 3);
  }

  public static score(): number {
    return 3;
  }

  public static gold(): number {
    return 14;
  }
};
