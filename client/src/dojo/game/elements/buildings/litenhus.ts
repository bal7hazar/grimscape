import { Resource } from "../../types/resource";
import { BuildingInterface } from "./interface";

export const Litenhus: BuildingInterface = class Litenhus {
  public static requirement(): Resource {
    return new Resource(2, 1, 0, 2);
  }

  public static score(): number {
    return 2;
  }

  public static gold(): number {
    return 10;
  }
};
