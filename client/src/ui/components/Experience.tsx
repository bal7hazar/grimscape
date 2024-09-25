import { useMemo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/elements/tooltip"

const WIDTH = 200;

export const Experience = ({ experience, total, reversed }: { experience: number, total: number, reversed?: boolean }) => {
  const width = useMemo(() => {
    return Math.floor(experience * WIDTH / total)
  }, [experience, total])

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className={`mt-1 h-4 relative rounded-br-lg bg-slate-700 border-slate-500 border`} style={{ width: WIDTH }}>
            <div className={`absolute h-full flex bg-slate-900 ${reversed ? "rounded-l-lg right-0" : "rounded-br-lg left-0"}`} style={{ width }} />
            <p className="absolute left-1/2 -translate-x-1/2 text-xs">{`${experience} / ${total}`}</p>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-md">XP</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
