import { useDojo } from "@/dojo/useDojo";
import { useMemo } from "react";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useComponentValue } from "@dojoengine/react";
import { Entity } from "@dojoengine/recs";
import { REALM_ID } from "@/dojo/constants";

export const useAdventurer = ({ dungeonId, adventurerId }: { dungeonId: number, adventurerId: number }) => {
  const {
    setup: {
      clientModels: {
        models: { Adventurer },
        classes: { Adventurer: AdventurerClass },
      },
    },
  } = useDojo();

  const key = useMemo(
    () => getEntityIdFromKeys([BigInt(REALM_ID), BigInt(dungeonId), BigInt(adventurerId)]) as Entity,
    [dungeonId, adventurerId],
  );
  const component = useComponentValue(Adventurer, key);
  const adventurer = useMemo(() => {
    return component ? new AdventurerClass(component) : null;
  }, [component]);

  return { adventurer, key };
};
