import { Resource } from "../../types/resource";
import { BuildingInterface } from "./interface";

export const Landgard: BuildingInterface = class Landgard {
  public static requirement(): Resource {
    return new Resource(0, 3, 1, 2);
  }

  public static score(): number {
    return 3;
  }

  public static gold(): number {
    return 12;
  }
};
