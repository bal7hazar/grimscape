import { useDojo } from "@/dojo/useDojo";
import { Adventurer } from "../containers/Adventurer";
import { Mobs } from "../containers/Mobs";
import { usePlayer } from "@/hooks/usePlayer";
import { useRealm } from "@/hooks/useRealm";
import { useAdventurer } from "@/hooks/useAdventurer";
import { Create } from "../actions/Create";
import { useMemo } from "react";
import { Player } from "@/dojo/models/player";
import { Signup } from "../actions/Signup";

export const Overlay = () => {
  const {
    account: { account },
  } = useDojo();

  const { player } = usePlayer({ playerId: account.address });
  const { realm } = useRealm();
  const { adventurer } = useAdventurer({ dungeonId: realm?.dungeon_count || 0, adventurerId: player?.adventurerId || 0 });

  const classNames = useMemo(() => {
    const base = "absolute top-16 left-1/2 -translate-x-1/2 w-full";
    if (!!adventurer && !adventurer.isDead()) return base;
    return `${base} fixed inset-0 z-50 bg-black/60`;
  }, [adventurer]);

  return (
    <div className={classNames}>
      {!adventurer && <WelcomeScene player={player} />}
      {!!adventurer && adventurer.isDead() && <OverScene />}
      {!!adventurer && !adventurer.isDead() && <GameScene />}
    </div>
  )
};

export const WelcomeScene = ({ player }: { player: Player | null }) => {
  return (
    <div className="flex flex-col gap-8 items-center absolute w-36 left-1/2 -translate-x-1/2 top-96">
      <h1 className="text-4xl text-center">Welcome to Grimscape</h1>
      {!player && <Signup />}
      {!!player && <Create />}
    </div>
  );
}

export const GameScene = () => {
  return (
    <div className="absolute top-16 w-full">
      <div className="absolute top-0 left-8">
        <Adventurer />
      </div>
      <div className="absolute top-0 right-8">
        <Mobs />
      </div>
    </div>
  );
}

export const OverScene = () => {
  return (
    <div className="flex flex-col gap-8 items-center absolute w-36 left-1/2 -translate-x-1/2 top-96">
      <h1 className="text-4xl text-center">Game Over</h1>
      <Create />
    </div>
  );
}
