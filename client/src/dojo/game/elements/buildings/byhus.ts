import { Resource } from "../../types/resource";
import { BuildingInterface } from "./interface";

export const Byhus: BuildingInterface = class Byhus {
  public static requirement(): Resource {
    return new Resource(2, 0, 2, 1);
  }

  public static score(): number {
    return 2;
  }

  public static gold(): number {
    return 10;
  }
};
