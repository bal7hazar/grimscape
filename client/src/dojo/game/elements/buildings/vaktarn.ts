import { Resource } from "../../types/resource";
import { BuildingInterface } from "./interface";

export const Vaktarn: BuildingInterface = class Vaktarn {
  public static requirement(): Resource {
    return new Resource(3, 3, 2, 2);
  }

  public static score(): number {
    return 5;
  }

  public static gold(): number {
    return 18;
  }
};
