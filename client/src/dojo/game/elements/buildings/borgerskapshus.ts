import { Resource } from "../../types/resource";
import { BuildingInterface } from "./interface";

export const Borgerskapshus: BuildingInterface = class Borgerskapshus {
  public static requirement(): Resource {
    return new Resource(2, 2, 2, 2);
  }

  public static score(): number {
    return 4;
  }

  public static gold(): number {
    return 16;
  }
};
