import { Resource } from "../../types/resource";
import { BuildingInterface } from "./interface";

export const Strahus: BuildingInterface = class Strahus {
  public static requirement(): Resource {
    return new Resource(0, 2, 1, 2);
  }

  public static score(): number {
    return 2;
  }

  public static gold(): number {
    return 10;
  }
};
