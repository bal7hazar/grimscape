import { useDojo } from "@/dojo/useDojo";
import { useMemo } from "react";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useComponentValue } from "@dojoengine/react";
import { Entity } from "@dojoengine/recs";
import { REALM_ID } from "@/dojo/constants";

export const useDungeon = ({ dungeonId }: { dungeonId: number }) => {
  const {
    setup: {
      clientModels: {
        models: { Dungeon },
        classes: { Dungeon: DungeonClass },
      },
    },
  } = useDojo();

  const key = useMemo(
    () => getEntityIdFromKeys([BigInt(REALM_ID), BigInt(dungeonId)]) as Entity,
    [dungeonId],
  );
  const component = useComponentValue(Dungeon, key);
  const dungeon = useMemo(() => {
    return component ? new DungeonClass(component) : null;
  }, [component]);

  return { dungeon, key };
};
