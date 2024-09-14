import { Resource } from "../../types/resource";
import { BuildingInterface } from "./interface";

export const Kirke: BuildingInterface = class Kirke {
  public static requirement(): Resource {
    return new Resource(4, 0, 2, 4);
  }

  public static score(): number {
    return 5;
  }

  public static gold(): number {
    return 18;
  }
};
