import { Resource } from "../../types/resource";
import { BuildingInterface } from "./interface";

export const Vannmolle: BuildingInterface = class Vannmolle {
  public static requirement(): Resource {
    return new Resource(0, 2, 3, 2);
  }

  public static score(): number {
    return 3;
  }

  public static gold(): number {
    return 14;
  }
};
