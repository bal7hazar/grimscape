import { useDojo } from "@/dojo/useDojo";
import { usePlayer } from "@/hooks/usePlayer";
import { useRealm } from "@/hooks/useRealm";
import { useAdventurer } from "@/hooks/useAdventurer";
import alive from "/assets/avatars/skeleton.png";
import dead from "/assets/avatars/skeleton-dead.png";
import { Health } from "../components/Health";
import { useMobs } from "@/hooks/useMobs";
import { Mob } from "@/dojo/models/mob";

export const Mobs = () => {
  const {
    account: { account },
  } = useDojo();

  const { player } = usePlayer({ playerId: account.address });
  const { realm } = useRealm();
  const { adventurer } = useAdventurer({ dungeonId: realm?.dungeon_count || 0, adventurerId: player?.adventurerId || 0 });
  const { mobs } = useMobs({ dungeonId: realm?.dungeon_count || 0, adventurerId: player?.adventurerId || 0, x: adventurer?.x || 0, y: adventurer?.y || 0 });

  if (!player || !realm || !adventurer) return null;

  return (
    <div className="absolute right-0 top-0">
      {mobs.map((mob: Mob, index: number) => (
        <Card key={index} health={mob.health} />
      ))}
    </div>
  );
};

export const Card = ({ health }: { health: number }) => {
  return (
    <div className="w-100 flex justify-between items-center px-8 py-2">
      <div className={`flex ${!health && "grayscale"}`}>
        <Health health={health} total={100} reversed={true} />
        <Avatar health={health} />
      </div>
    </div>
  );
}

export const Avatar = ({ health }: { health: number }) => {
  return <div className="h-24 w-24 rounded border-4 border-slate-500 p-2 bg-slate-700">
    <img src={!health ? dead : alive} alt="adventurer" />
  </div>
}
