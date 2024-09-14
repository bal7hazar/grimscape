import { Resource } from "../../types/resource";
import { BuildingInterface } from "./interface";

export const Landhus: BuildingInterface = class Landhus {
  public static requirement(): Resource {
    return new Resource(1, 2, 1, 1);
  }

  public static score(): number {
    return 2;
  }

  public static gold(): number {
    return 10;
  }
};
