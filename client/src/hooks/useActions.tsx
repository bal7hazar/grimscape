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

export const useActions = () => {
  const {
    account: { account },
    setup: {
      systemCalls: { signup, create, perform },
    },
  } = useDojo();

  const { player } = usePlayer({ playerId: account.address });
  const { realm } = useRealm();
  const { dungeon } = useDungeon({ dungeonId: realm?.dungeon_count || 0 });
  const { adventurer, key: adventurerKey } = useAdventurer({ dungeonId: dungeon?.id || 0, adventurerId: player?.adventurerId || 0 });
  const { rooms } = useRooms({ dungeonId: dungeon?.id || 0, adventurerId: player?.adventurerId || 0 });
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
    async (direction: number) => {
      if (!adventurer || !adventurerKey) return;
      let position = adventurer.position;
      const localX = position % ROOM_WIDTH;
      const localY = Math.floor(position / ROOM_WIDTH);
      let x = adventurer.x;
      let y = adventurer.y;
      switch (direction) {
        case 1:
          if (localY < ROOM_HEIGHT - 1) {
            position += ROOM_WIDTH;
          } else {
            y += 1;
            position = localX;
          }
          break;
        case 2:
          if (localX > 0) {
            position -= 1;
          } else {
            x += 1;
            position = ROOM_WIDTH * localY + ROOM_WIDTH - 1;
          }
          break;
        case 3:
          if (localY > 0) {
            position -= ROOM_WIDTH;
          } else {
            y -= 1;
            position = ROOM_WIDTH * (ROOM_HEIGHT - 1) + localX;
          }
          break;
        case 4:
          if (localX < ROOM_WIDTH - 1) {
            position += 1;
          } else {
            x -= 1;
            position = ROOM_WIDTH * localY;
          }
          break;
        default:
          return;
      }
      await perform({ account, key: adventurerKey, position, x, y, direction });
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
    gameManager.setMobs(mobs);
  }, [gameManager, mobs]);
};
