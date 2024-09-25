import { useMemo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/elements/tooltip"

const WIDTH = 200;

export const Health = ({ health, total, reversed }: { health: number, total: number, reversed?: boolean }) => {
  const width = useMemo(() => {
    return Math.floor(health * WIDTH / total)
  }, [health, total])

  const color = useMemo(() => {
    if (health > total * 0.75) return "bg-lime-500";
    if (health > total * 0.5) return "bg-yellow-500";
    if (health > total * 0.25) return "bg-orange-500";
    return "bg-red-500";
  }, [health, total]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className={`mt-1 h-6 relative ${reversed ? "rounded-l-lg" : "rounded-tr-lg"} bg-slate-700 border-slate-500 border`} style={{ width: WIDTH }}>
            <div className={`absolute h-full flex ${color} ${reversed ? "rounded-l-lg right-0" : "rounded-tr-lg left-0"}`} style={{ width }} />
            <p className="absolute left-1/2 -translate-x-1/2">{`${health} / ${total}`}</p>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-md">HP</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
