import { useDojo } from "@/dojo/useDojo";
import { useEffect, useState } from "react";
import { useEntityQuery } from "@dojoengine/react";
import { Has, HasValue, getComponentValue } from "@dojoengine/recs";
import { Room } from "@/dojo/models/room";

export const useRooms = ({ dungeonId, adventurerId }: { dungeonId: number, adventurerId: number }): { rooms: Room[] } => {
  const [rooms, setRooms] = useState<any>({});

  const {
    setup: {
      clientModels: {
        models: { Room },
        classes: { Room: RoomClass },
      },
    },
  } = useDojo();

  const keys = useEntityQuery([
    Has(Room),
    HasValue(Room, { dungeon_id: dungeonId, adventurer_id: adventurerId }),
  ]);

  useEffect(() => {
    const components = keys.map((key) => {
      const component = getComponentValue(Room, key);
      if (!component) {
        return undefined;
      }
      return new RoomClass(component);
    });

    const objectified = components.reduce(
      (obj: any, room: Room | undefined) => {
        if (room) {
          obj[`${room.x}-${room.y}`] = room;
        }
        return obj;
      },
      {},
    );

    setRooms(objectified);
  }, [keys]);

  return { rooms: Object.values(rooms) };
};
