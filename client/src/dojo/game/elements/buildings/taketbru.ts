import { Resource } from "../../types/resource";
import { BuildingInterface } from "./interface";

export const Taketbru: BuildingInterface = class Taketbru {
  public static requirement(): Resource {
    return new Resource(0, 1, 2, 0);
  }

  public static score(): number {
    return 1;
  }

  public static gold(): number {
    return 6;
  }
};
