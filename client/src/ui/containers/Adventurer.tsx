import { useDojo } from "@/dojo/useDojo";
import { usePlayer } from "@/hooks/usePlayer";
import { useRealm } from "@/hooks/useRealm";
import { useAdventurer } from "@/hooks/useAdventurer";
import adventurer from "/assets/avatars/adventurer.png";
import dead from "/assets/avatars/adventurer-dead.png";
import coin from "/assets/objects/coin.png";
import { Health } from "../components/Health";
import { useCallback } from "react";
import { EventBus } from "@/phaser/EventBus";
import { Experience } from "../components/Experience";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/elements/tooltip"

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
        <Avatar health={adventurer.health} level={adventurer.getLevel()} />
      </div>
      <div className="absolute left-24">
        <Health health={adventurer.health} total={adventurer.base_health} />
      </div>
      <div className="absolute top-6 left-24">
        <Experience experience={adventurer.getExperience()} total={adventurer.getTotalExperience()} />
      </div>
      <div className="absolute left-24 top-12">
        <Gold gold={adventurer.gold} />
      </div>
    </div>
  );
};

export const Avatar = ({ health, level }: { health: number, level: number }) => {
  const handleClick = useCallback(() => {
    EventBus.emit("center-camera");
  }, []);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="h-24 w-24 relative rounded border-4 border-slate-500 p-2 bg-slate-700" onClick={handleClick}>
          <img src={!health ? dead : adventurer} alt="adventurer" />
          <div className="absolute top-1 left-1 rounded-full flex justify-center items-center h-5 w-5 bg-slate-900">
            <p className="text-xs">{level}</p>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-md">Click to center the camera</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export const Gold = ({ gold }: { gold: number }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="flex items-center w-16">
          <img src={coin} alt="coin" className="h-6 w-6" />
          <p>{gold}</p>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-md">Gold</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
