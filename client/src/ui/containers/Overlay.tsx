import { useState } from "react";
import { useDojo } from "@/dojo/useDojo";
import { usePlayer } from "@/hooks/usePlayer";
import { Button } from "../elements/button";
import { useRealm } from "@/hooks/useRealm";
import { useDungeon } from "@/hooks/useDungeon";
import { useAdventurer } from "@/hooks/useAdventurer";
import { useRoom } from "@/hooks/useRoom";
import { useMobs } from "@/hooks/useMobs";
import { Input } from "../elements/input";

export const Overlay = () => {
  const {
    account: { account },
    setup: {
      systemCalls: { signup, create, move, interact, explore },
    },
  } = useDojo();

  const [name, setName] = useState<string>("");
  const [direction, setDirection] = useState<number>(0);

  const { player } = usePlayer({ playerId: account.address });
  const { realm } = useRealm();
  const { dungeon } = useDungeon({ dungeonId: realm?.dungeon_count || 0 });
  const { adventurer } = useAdventurer({ dungeonId: realm?.dungeon_count || 0, adventurerId: player?.adventurerId || 0 });
  const { room } = useRoom({ dungeonId: realm?.dungeon_count || 0, adventurerId: player?.adventurerId || 0, x: adventurer?.x || 0, y: adventurer?.y || 0 });
  const { mobs } = useMobs({ dungeonId: realm?.dungeon_count || 0, adventurerId: player?.adventurerId || 0, x: adventurer?.x || 0, y: adventurer?.y || 0 });

  return (
    <div className="w-full flex justify-between items-center px-8 py-2 absolute top-1/2 left-0 -translate-y-1/2">
      <div className="flex flex-col gap-2">
        <Input value={name} onChange={(e: any) => setName(e.target.value)} />
        <Input value={direction} onChange={(e: any) => setDirection(e.target.value)} />
        <Button variant="outline" onClick={() => signup({ account, name })}>
          Signup
        </Button>
        <Button variant="outline" onClick={() => create({ account })}>
          Create
        </Button>
        <Button variant="outline" onClick={() => move({ account, direction })}>
          Move
        </Button>
        <Button variant="outline" onClick={() => interact({ account, direction })}>
          Interact
        </Button>
        <Button variant="outline" onClick={() => explore({ account, direction })}>
          Explore
        </Button>
      </div>
    </div>
  );
};
