import { Resource } from "../../types/resource";
import { BuildingInterface } from "./interface";

export const Trehytte: BuildingInterface = class Trehytte {
  public static requirement(): Resource {
    return new Resource(0, 2, 1, 0);
  }

  public static score(): number {
    return 1;
  }

  public static gold(): number {
    return 6;
  }
};
