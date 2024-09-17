import { useDojo } from "@/dojo/useDojo";
import { usePlayer } from "@/hooks/usePlayer";
import { useRealm } from "@/hooks/useRealm";
import { useAdventurer } from "@/hooks/useAdventurer";
import adventurer from "/assets/avatars/adventurer.png";
import dead from "/assets/avatars/adventurer-dead.png";
import { Health } from "../components/Health";
import { useCallback } from "react";
import { EventBus } from "@/phaser/EventBus";

export const Adventurer = () => {
  const {
    account: { account },
  } = useDojo();

  const { player } = usePlayer({ playerId: account.address });
  const { realm } = useRealm();
  const { adventurer } = useAdventurer({ dungeonId: realm?.dungeon_count || 0, adventurerId: player?.adventurerId || 0 });

  if (!player || !realm || !adventurer) return null;

  return (
    <div className={`relative ${!adventurer.health && "grayscale"}`}>
      <div className="absolute left-0">
        <Avatar health={adventurer.health} />
      </div>
      <div className="absolute left-24">
        <Health health={adventurer.health} total={100} />
      </div>
    </div>
  );
};

export const Avatar = ({ health }: { health: number }) => {
  const handleClick = useCallback(() => {
    EventBus.emit("center-camera");
  }, []);

  return <div className="h-24 w-24 rounded border-4 border-slate-500 p-2 bg-slate-700" onClick={handleClick}>
    <img src={!health ? dead : adventurer} alt="adventurer" />
  </div>
}
