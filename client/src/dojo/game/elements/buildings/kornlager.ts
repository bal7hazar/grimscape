import { Resource } from "../../types/resource";
import { BuildingInterface } from "./interface";

export const Kornlager: BuildingInterface = class Kornlager {
  public static requirement(): Resource {
    return new Resource(0, 2, 3, 1);
  }

  public static score(): number {
    return 3;
  }

  public static gold(): number {
    return 12;
  }
};
