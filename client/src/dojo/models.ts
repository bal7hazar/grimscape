import { ContractComponents } from "./bindings/models.gen";
import { Player } from "./models/player";
import { Realm } from "./models/realm";
import { Dungeon } from "./models/dungeon";
import { Adventurer } from "./models/adventurer";
import { Room } from "./models/room";
import { Mob } from "./models/mob";

export type ClientModels = ReturnType<typeof models>;

export function models({
  contractModels,
}: {
  contractModels: ContractComponents;
}) {
  return {
    models: {
      ...contractModels,
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
