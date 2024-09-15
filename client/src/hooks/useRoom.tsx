import { useDojo } from "@/dojo/useDojo";
import { useMemo } from "react";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useComponentValue } from "@dojoengine/react";
import { Entity } from "@dojoengine/recs";
import { REALM_ID } from "@/dojo/constants";

export const useRoom = ({ dungeonId, adventurerId, x, y }: { dungeonId: number, adventurerId: number, x: number, y: number }) => {
  const {
    setup: {
      clientModels: {
        models: { Room },
        classes: { Room: RoomClass },
      },
    },
  } = useDojo();

  const key = useMemo(
    () => getEntityIdFromKeys([BigInt(REALM_ID), BigInt(dungeonId), BigInt(adventurerId), BigInt(x), BigInt(y)]) as Entity,
    [dungeonId, adventurerId, x, y],
  );
  const component = useComponentValue(Room, key);
  const room = useMemo(() => {
    return component ? new RoomClass(component) : null;
  }, [component]);

  return { room, key };
};
