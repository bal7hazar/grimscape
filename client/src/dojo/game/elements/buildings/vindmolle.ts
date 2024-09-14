import { Resource } from "../../types/resource";
import { BuildingInterface } from "./interface";

export const Vindmolle: BuildingInterface = class Vindmolle {
  public static requirement(): Resource {
    return new Resource(3, 0, 3, 1);
  }

  public static score(): number {
    return 3;
  }

  public static gold(): number {
    return 14;
  }
};
