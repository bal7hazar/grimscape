import { Resource } from "../../types/resource";
import { BuildingInterface } from "./interface";

export const Pergola: BuildingInterface = class Pergola {
  public static requirement(): Resource {
    return new Resource(1, 0, 0, 1);
  }

  public static score(): number {
    return 0;
  }

  public static gold(): number {
    return 8;
  }
};
