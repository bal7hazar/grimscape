import { useDojo } from "@/dojo/useDojo";
import { usePlayer } from "@/hooks/usePlayer";
import { useRealm } from "@/hooks/useRealm";
import { useAdventurer } from "@/hooks/useAdventurer";
import adventurer from "/assets/avatars/adventurer.png";
import dead from "/assets/avatars/adventurer-dead.png";
import { Health } from "../components/Health";

export const Adventurer = () => {
  const {
    account: { account },
  } = useDojo();

  const { player } = usePlayer({ playerId: account.address });
  const { realm } = useRealm();
  const { adventurer } = useAdventurer({ dungeonId: realm?.dungeon_count || 0, adventurerId: player?.adventurerId || 0 });

  if (!player || !realm || !adventurer) return null;

  return (
    <div className="w-100 flex justify-between items-center px-8 py-2 absolute top-0 left-0">
      <div className={`flex ${!adventurer.health && "grayscale"}`}>
        <Avatar health={adventurer.health} />
        <Health health={adventurer.health} total={100} />
      </div>
    </div>
  );
};

export const Avatar = ({ health }: { health: number }) => {
  return <div className="h-24 w-24 rounded border-4 border-slate-500 p-2 bg-slate-700">
    <img src={!health ? dead : adventurer} alt="adventurer" />
  </div>
}
