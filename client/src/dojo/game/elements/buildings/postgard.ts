import { Resource } from "../../types/resource";
import { BuildingInterface } from "./interface";

export const Postgard: BuildingInterface = class Postgard {
  public static requirement(): Resource {
    return new Resource(3, 1, 2, 2);
  }

  public static score(): number {
    return 4;
  }

  public static gold(): number {
    return 16;
  }
};
