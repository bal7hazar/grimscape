import { Resource } from "../../types/resource";
import { BuildingInterface } from "./interface";

export const Hof: BuildingInterface = class Hof {
  public static requirement(): Resource {
    return new Resource(5, 4, 4, 4);
  }

  public static score(): number {
    return 8;
  }

  public static gold(): number {
    return 20;
  }
};
