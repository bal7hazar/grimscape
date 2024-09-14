import { Resource } from "../../types/resource";
import { BuildingInterface } from "./interface";

export const Hytte: BuildingInterface = class Hytte {
  public static requirement(): Resource {
    return new Resource(0, 1, 1, 0);
  }

  public static score(): number {
    return 0;
  }

  public static gold(): number {
    return 8;
  }
};
