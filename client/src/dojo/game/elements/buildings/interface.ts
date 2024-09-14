import { Resource } from "@/dojo/game/types/resource";

export interface BuildingInterface {
  requirement(): Resource;
  score(): number;
  gold(): number;
}
