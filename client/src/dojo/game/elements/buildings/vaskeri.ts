import { Resource } from "../../types/resource";
import { BuildingInterface } from "./interface";

export const Vaskeri: BuildingInterface = class Vaskeri {
  public static requirement(): Resource {
    return new Resource(0, 1, 0, 2);
  }

  public static score(): number {
    return 1;
  }

  public static gold(): number {
    return 6;
  }
};
