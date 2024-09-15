import { ContractComponents } from "./bindings/models.gen";
import { Player } from "./models/player";
import { Realm } from "./models/realm";
import { Dungeon } from "./models/dungeon";
import { Adventurer } from "./models/adventurer";
import { Room } from "./models/room";
import { Mob } from "./models/mob";
import { overridableComponent } from "@dojoengine/recs";

export type ClientModels = ReturnType<typeof models>;

export function models({
  contractModels,
}: {
  contractModels: ContractComponents;
}) {
  return {
    models: {
      ...contractModels,
      Player: overridableComponent(contractModels.Player),
      Realm: overridableComponent(contractModels.Realm),
      Dungeon: overridableComponent(contractModels.Dungeon),
      Adventurer: overridableComponent(contractModels.Adventurer),
      Room: overridableComponent(contractModels.Room),
      Mob: overridableComponent(contractModels.Mob),
    },
    classes: {
      Player,
      Realm,
      Dungeon,
      Adventurer,
      Room,
      Mob,
    },
  };
}
