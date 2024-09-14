import { ContractComponents } from "./bindings/models.gen";
import { Player } from "./game/models/player";

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
    },
  };
}
