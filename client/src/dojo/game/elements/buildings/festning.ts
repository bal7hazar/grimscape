import { Resource } from "../../types/resource";
import { BuildingInterface } from "./interface";

export const Festning: BuildingInterface = class Festning {
  public static requirement(): Resource {
    return new Resource(5, 3, 5, 3);
  }

  public static score(): number {
    return 7;
  }

  public static gold(): number {
    return 20;
  }
};
