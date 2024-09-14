import { Resource } from "../../types/resource";
import { BuildingInterface } from "./interface";

export const Gydingar: BuildingInterface = class Gydingar {
  public static requirement(): Resource {
    return new Resource(4, 3, 2, 1);
  }

  public static score(): number {
    return 5;
  }

  public static gold(): number {
    return 18;
  }
};
