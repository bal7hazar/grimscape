import { Resource } from "../../types/resource";
import { BuildingInterface } from "./interface";

export const Kloster: BuildingInterface = class Kloster {
  public static requirement(): Resource {
    return new Resource(4, 2, 4, 0);
  }

  public static score(): number {
    return 5;
  }

  public static gold(): number {
    return 18;
  }
};
