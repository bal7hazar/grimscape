import { Resource } from "../../types/resource";
import { BuildingInterface } from "./interface";

export const Svinehus: BuildingInterface = class Svinehus {
  public static requirement(): Resource {
    return new Resource(0, 2, 2, 2);
  }

  public static score(): number {
    return 3;
  }

  public static gold(): number {
    return 12;
  }
};
