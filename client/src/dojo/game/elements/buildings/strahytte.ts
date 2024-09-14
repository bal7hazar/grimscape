import { Resource } from "../../types/resource";
import { BuildingInterface } from "./interface";

export const Strahytte: BuildingInterface = class Strahytte {
  public static requirement(): Resource {
    return new Resource(1, 0, 0, 2);
  }

  public static score(): number {
    return 1;
  }

  public static gold(): number {
    return 6;
  }
};
