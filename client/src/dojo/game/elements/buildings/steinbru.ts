import { Resource } from "../../types/resource";
import { BuildingInterface } from "./interface";

export const Steinbru: BuildingInterface = class Steinbru {
  public static requirement(): Resource {
    return new Resource(2, 0, 1, 0);
  }

  public static score(): number {
    return 1;
  }

  public static gold(): number {
    return 6;
  }
};
