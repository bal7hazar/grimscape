import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDojo } from "@/dojo/useDojo";
import { usePlayer } from "./usePlayer";
import PlayerManager from "@/phaser/managers/player";
import GameManager from "@/phaser/managers/game";
import { useRealm } from "./useRealm";
import { useDungeon } from "./useDungeon";
import { useAdventurer } from "./useAdventurer";
import { useMobs } from "./useMobs";
import { useRooms } from "./useRooms";
import { ROOM_HEIGHT, ROOM_WIDTH } from "@/dojo/constants";
import { useRoom } from "./useRoom";
import { Direction } from "@/dojo/types/direction";

export const useActions = () => {
  const {
    account: { account },
    setup: {
      systemCalls: { signup, create, perform, multiperform },
    },
  } = useDojo();

  const { player } = usePlayer({ playerId: account.address });
  const { realm } = useRealm();
  const { dungeon } = useDungeon({ dungeonId: realm?.dungeon_count || 0 });
  const { adventurer, key: adventurerKey } = useAdventurer({ dungeonId: dungeon?.id || 0, adventurerId: player?.adventurerId || 0 });
  const { rooms } = useRooms({ dungeonId: dungeon?.id || 0, adventurerId: player?.adventurerId || 0 });
  const { room } = useRoom({ dungeonId: dungeon?.id || 0, adventurerId: player?.adventurerId || 0, x: adventurer?.x || 0, y: adventurer?.y || 0 });
  const { mobs } = useMobs({ dungeonId: dungeon?.id || 0, adventurerId: player?.adventurerId || 0, x: adventurer?.x || 0, y: adventurer?.y || 0 });

  const handleSignup = useCallback(
    async (name: string) => {
      await signup({ account, name });
    },
    [account],
  );

  const handleCreate = useCallback(
    async () => {
      await create({ account });
    },
    [account],
  );

  const handlePerform = useCallback(
    async (options: { move: boolean }, args: { direction: Direction }) => {
      if (!adventurer || !adventurerKey || !room) return;
      const { position, x, y } = adventurer.getNext(args.direction.value);
      const opts = {
        key: adventurerKey,
        move: options.move,
        position,
        x,
        y
      }
      await perform({ account, options: opts, direction: args.direction.into() });
    },
    [account, adventurer, adventurerKey],
  );
  
  const handleMultiperform = useCallback(
    async (args: { directions: Direction[] }) => {
      if (!adventurer || !adventurerKey || !room) return;
      const directions = args.directions.map((direction) => direction.into());
      await multiperform({ account, directions });
    },
    [account, adventurer, adventurerKey],
  );

  const playerManager = useMemo(() => {
    return PlayerManager.getInstance();
  }, []);

  const gameManager = useMemo(() => {
    return GameManager.getInstance();
  }, []);

  useEffect(() => {
    playerManager.setSignup(handleSignup);
    if (!player) return;
    playerManager.setPlayer(player);
    playerManager.setUsername(player.name);
  }, [playerManager, player, handleSignup]);

  useEffect(() => {
    gameManager.setCreate(handleCreate);
    gameManager.setPerform(handlePerform);
    gameManager.setMultiperform(handleMultiperform);
  }, [handleCreate, handlePerform, gameManager]);

  useEffect(() => {
    gameManager.setRealm(realm);
  }, [gameManager, realm]);

  useEffect(() => {
    gameManager.setDungeon(dungeon);
  }, [gameManager, dungeon]);

  useEffect(() => {
    gameManager.setAdventurer(adventurer);
  }, [gameManager, adventurer]);

  useEffect(() => {
    gameManager.setRooms(rooms);
  }, [gameManager, rooms]);

  useEffect(() => {
    gameManager.setRoom(room);
  }, [gameManager, room]);

  useEffect(() => {
    gameManager.setMobs(mobs);
  }, [gameManager, mobs]);
};
