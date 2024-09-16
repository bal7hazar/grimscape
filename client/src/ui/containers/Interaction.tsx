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

export const Interaction = () => {
  const {
    account: { account },
    setup: {
      systemCalls: { signup, create },
    },
  } = useDojo();

  const [name, setName] = useState<string>("");

  const { player } = usePlayer({ playerId: account.address });
  const { realm } = useRealm();
  const { dungeon } = useDungeon({ dungeonId: realm?.dungeon_count || 0 });
  const { adventurer } = useAdventurer({ dungeonId: realm?.dungeon_count || 0, adventurerId: player?.adventurerId || 0 });
  const { room } = useRoom({ dungeonId: realm?.dungeon_count || 0, adventurerId: player?.adventurerId || 0, x: adventurer?.x || 0, y: adventurer?.y || 0 });
  const { mobs } = useMobs({ dungeonId: realm?.dungeon_count || 0, adventurerId: player?.adventurerId || 0, x: adventurer?.x || 0, y: adventurer?.y || 0 });

  return (
    <div className="w-48 flex justify-between items-center px-8 py-2 absolute translate-y-80">
      <div className="flex flex-col gap-2">
        <Input value={name} onChange={(e: any) => setName(e.target.value)} />
        <Button variant="outline" onClick={() => signup({ account, name })}>
          Signup
        </Button>
        <Button variant="outline" onClick={() => create({ account })}>
          Create
        </Button>
      </div>
    </div>
  );
};