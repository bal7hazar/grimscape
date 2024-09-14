import { Resource } from "../../types/resource";
import { BuildingInterface } from "./interface";

export const Gjestgiveri: BuildingInterface = class Gard {
  public static requirement(): Resource {
    return new Resource(2, 1, 1, 2);
  }

  public static score(): number {
    return 3;
  }

  public static gold(): number {
    return 12;
  }
};
