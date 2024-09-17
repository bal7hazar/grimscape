import { useDojo } from "@/dojo/useDojo";
import { usePlayer } from "@/hooks/usePlayer";
import { Button } from "../elements/button";
import { useRealm } from "@/hooks/useRealm";
import { useAdventurer } from "@/hooks/useAdventurer";

export const Create = () => {
  const {
    account: { account },
    setup: {
      systemCalls: { create },
    },
  } = useDojo();

  const { player } = usePlayer({ playerId: account.address });
  const { realm } = useRealm();
  const { adventurer } = useAdventurer({ dungeonId: realm?.dungeon_count || 0, adventurerId: player?.adventurerId || 0 });

  if (!!adventurer && !adventurer.isDead()) return null;

  return (
    <Button className="text-xl" onClick={() => create({ account })}>
      Enter
    </Button>
  );
};
