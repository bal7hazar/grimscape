import { useDojo } from "@/dojo/useDojo";
import { usePlayer } from "@/hooks/usePlayer";
import { useRealm } from "@/hooks/useRealm";
import { useAdventurer } from "@/hooks/useAdventurer";
import alive from "/assets/avatars/skeleton.png";
import dead from "/assets/avatars/skeleton-dead.png";
import { Health } from "../components/Health";
import { useMobs } from "@/hooks/useMobs";
import { Mob } from "@/dojo/models/mob";
import { useMemo } from "react";

export const Mobs = () => {
  const {
    account: { account },
  } = useDojo();

  const { player } = usePlayer({ playerId: account.address });
  const { realm } = useRealm();
  const { adventurer } = useAdventurer({ dungeonId: realm?.dungeon_count || 0, adventurerId: player?.adventurerId || 0 });
  const { mobs } = useMobs({ dungeonId: realm?.dungeon_count || 0, adventurerId: player?.adventurerId || 0 });

  const locals = useMemo(() => {
    if (!adventurer || !mobs) return [];
    return mobs.filter((mob: Mob) => mob.x === adventurer.x && mob.y === adventurer.y);
  }, [mobs, adventurer]);

  if (!player || !realm || !adventurer) return null;

  return (
    <div className="relative">
      {locals.map((mob: Mob, index: number) => (
        <Card key={index} health={mob.health} level={mob.level} total={mob.base_health} row={index} />
      ))}
    </div>
  );
};

export const Card = ({ health, level, total, row }: { health: number, level: number, total: number, row: number }) => {
  const top = useMemo(() => `${row * 108}px`, [row]);

  return (
    <div className={`relative ${!health && "grayscale"}`}>
      <div className={`absolute right-0`} style={{ top }}>
        <Avatar health={health} level={level} />
      </div>
      <div className={`absolute right-24`} style={{ top }}>
        <Health health={health} total={total} reversed={true}  />
      </div>
    </div>
  );
}

export const Avatar = ({ health, level }: { health: number, level: number }) => {
  return <div className="h-24 w-24 relative rounded border-4 border-slate-500 p-2 bg-slate-700">
    <img src={!health ? dead : alive} alt="adventurer" />
    <div className="absolute top-1 left-1 rounded-full flex justify-center items-center h-5 w-5 bg-slate-900">
      <p className="text-xs">{level}</p>
    </div>
  </div>
}