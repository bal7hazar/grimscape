import { useDojo } from "@/dojo/useDojo";
import { useEffect, useState } from "react";
import { useEntityQuery } from "@dojoengine/react";
import { Has, HasValue, getComponentValue } from "@dojoengine/recs";
import { Mob } from "@/dojo/models/mob";

export const useMobs = ({ dungeonId, adventurerId, x, y }: { dungeonId: number, adventurerId: number, x: number, y: number }): { mobs: Mob[] } => {
  const [mobs, setMobs] = useState<any>({});

  const {
    setup: {
      clientModels: {
        models: { Mob },
        classes: { Mob: MobClass },
      },
    },
  } = useDojo();

  const keys = useEntityQuery([
    Has(Mob),
    HasValue(Mob, { dungeon_id: dungeonId, adventurer_id: adventurerId, x, y }),
  ]);

  useEffect(() => {
    const components = keys.map((key) => {
      const component = getComponentValue(Mob, key);
      if (!component) {
        return undefined;
      }
      return new MobClass(component);
    });

    const objectified = components.reduce(
      (obj: any, mob: Mob | undefined) => {
        if (mob) {
          obj[`${mob.id}`] = mob;
        }
        return obj;
      },
      {},
    );

    setMobs(objectified);
  }, [keys]);

  return { mobs: Object.values(mobs) };
};