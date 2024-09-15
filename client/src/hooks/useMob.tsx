import { useDojo } from "@/dojo/useDojo";
import { useMemo } from "react";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useComponentValue } from "@dojoengine/react";
import { Entity } from "@dojoengine/recs";
import { REALM_ID } from "@/dojo/constants";

export const useMob = ({ dungeonId, adventurerId, x, y, mobId }: { dungeonId: number, adventurerId: number, x: number, y: number, mobId: number }) => {
  const {
    setup: {
      clientModels: {
        models: { Mob },
        classes: { Mob: MobClass },
      },
    },
  } = useDojo();

  const key = useMemo(
    () => getEntityIdFromKeys([BigInt(REALM_ID), BigInt(dungeonId), BigInt(adventurerId), BigInt(x), BigInt(y), BigInt(mobId)]) as Entity,
    [dungeonId, adventurerId, x, y],
  );
  const component = useComponentValue(Mob, key);
  const mob = useMemo(() => {
    return component ? new MobClass(component) : null;
  }, [component]);

  return { mob, key };
};
