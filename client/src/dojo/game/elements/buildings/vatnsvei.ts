import { Resource } from "../../types/resource";
import { BuildingInterface } from "./interface";

export const Vatnsvei: BuildingInterface = class Vatnsvei {
  public static requirement(): Resource {
    return new Resource(5, 2, 5, 0);
  }

  public static score(): number {
    return 6;
  }

  public static gold(): number {
    return 20;
  }
};
