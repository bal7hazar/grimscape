import { Resource } from "../../types/resource";
import { BuildingInterface } from "./interface";

export const Offerkapell: BuildingInterface = class Offerkapell {
  public static requirement(): Resource {
    return new Resource(3, 2, 2, 3);
  }

  public static score(): number {
    return 5;
  }

  public static gold(): number {
    return 18;
  }
};
