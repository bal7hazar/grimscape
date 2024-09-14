import { Resource } from "../../types/resource";
import { BuildingInterface } from "./interface";

export const Fjos: BuildingInterface = class Fjos {
  public static requirement(): Resource {
    return new Resource(0, 1, 2, 3);
  }

  public static score(): number {
    return 3;
  }

  public static gold(): number {
    return 12;
  }
};
