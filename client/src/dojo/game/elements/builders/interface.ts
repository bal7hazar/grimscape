import { Resource } from "@/dojo/game/types/resource";

export interface BuilderInterface {
  count(): number;
  cost(): number;
  resource(version: number): Resource;
}
