import { useCallback, useMemo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/elements/tooltip"
import { useDojo } from "@/dojo/useDojo";

export const Attributes = ({ str, dex, vit, int, wis, cha, points }: { str: number, dex: number, vit: number, int: number, wis: number, cha: number, points: number }) => {
  const attributes = useMemo(() => {
    return [
      { value: str, label: "STR", description: "Strength", index: 1 },
      { value: dex, label: "DEX", description: "Dexterity", index: 2 },
      { value: vit, label: "VIT", description: "Vitality", index: 3 },
      { value: int, label: "INT", description: "Intelligence", index: 4 },
      { value: wis, label: "WIS", description: "Wisdom", index: 5 },
      { value: cha, label: "CHA", description: "Charisma", index: 6 },
    ]
  }, [str, dex, vit, int, wis, cha]);

  return (
    <TooltipProvider>
      <div className="flex gap-2 ml-1">
        {attributes.map((attribute) => (
          <Attribute key={attribute.label} points={points} {...attribute} />
        ))}
      </div>
    </TooltipProvider>
  );
}

export const Attribute = ({ points, value, label, description, index }: { points: number, value: number, label: string, description: string, index: number }) => {
  const {
    account: { account },
    setup: {
      systemCalls: { update },
    },
  } = useDojo();

  const handleClick = useCallback(() => {
    if (points === 0) return;
    update({ account, attribute: index });
  }, [account, points, index]);

  return (
    <Tooltip>
      <TooltipTrigger>
        <p onClick={handleClick}>{`${label}:${value}`}</p>
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-md">{description}</p>
      </TooltipContent>
    </Tooltip>
  );
};
