import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDojo } from "@/dojo/useDojo";
import { usePlayer } from "./usePlayer";
import PlayerManager from "@/phaser/managers/player";
import GameManager from "@/phaser/managers/game";

export const useActions = () => {
  const {
    account: { account },
    setup: {
      systemCalls: { signup },
    },
  } = useDojo();

  const { player } = usePlayer({ playerId: account.address });

  const handleSignup = useCallback(
    async (name: string) => {
      await signup({ account, name });
    },
    [account],
  );

  const playerManager = useMemo(() => {
    return PlayerManager.getInstance();
  }, []);

  const gameManager = useMemo(() => {
    return GameManager.getInstance();
  }, []);

  useEffect(() => {
    playerManager.setSignup(handleSignup);
    playerManager.setPlayer(player);
  }, [playerManager, player, handleSignup]);

  useEffect(() => {
    if (!player) return;
    playerManager.setUsername(player.name);
  }, [playerManager, player]);
};
