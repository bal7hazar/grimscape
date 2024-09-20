import { useDojo } from "@/dojo/useDojo";
import { Component, ComponentUpdate, ComponentValue, World } from "@dojoengine/recs";
import { useCallback, useEffect } from "react";
import { defineComponentSystem } from "@dojoengine/recs";
import { Adventurer } from "@/dojo/models/adventurer";
import { Mob } from "@/dojo/models/mob";
import GameManager from "@/phaser/managers/game";

export const useEvents = () => {
  const {
    setup: {
      contractModels: { AdventurerUpdate, AdventurerHit, MobUpdate, MobHit },
      world,
    },
  } = useDojo();

  const handleAdventurerUpdate = (update: ComponentUpdate) => {
    const identifier = update.value[0]?.id;
    const adventurer = new Adventurer(update.value[0]?.adventurer as ComponentValue);
    // FIXME: checking if adventurer exists solve the issue of loading old events since it is not set at the loading time
    if (!GameManager.getInstance().adventurer || GameManager.getInstance().adventurer?.id !== adventurer.id) return;
    GameManager.getInstance().addAdventurerUpdate(identifier, adventurer);
  };

  const handleAdventurerHit = (update: ComponentUpdate) => {
    const adventurer = new Adventurer(update.value[0]?.adventurer as ComponentValue);
  }
  
  const handleMobUpdate = (update: ComponentUpdate) => {
    const identifier = update.value[0]?.id;
    const mob = new Mob(update.value[0]?.mob as ComponentValue);
    // FIXME: checking if adventurer exists solve the issue of loading old events since it is not set at the loading time
    if (!GameManager.getInstance().adventurer || GameManager.getInstance().adventurer?.id !== mob.adventurer_id) return;
    GameManager.getInstance().addMobUpdate(identifier, mob);
  }

  const handleMobHit = (update: ComponentUpdate) => {
    const mob = new Mob(update.value[0]?.mob as ComponentValue);
  }

  const createEventStream = useCallback((
    world: World,
    component: Component<any>,
    handler: (update: ComponentUpdate) => void
  ) => {
    defineComponentSystem(
      world,
      component,
      (update: ComponentUpdate) => {
        // console.log(update.value[0]?.time * 1000 <= Date.now() - 100000);
        // if (update.value[0]?.time * 1000 <= Date.now() - 100000) {
        //   return;
        // }
        handler(update);
      },
      { runOnInit: false }
    );
  }, []);

  useEffect(() => {
    createEventStream(world, AdventurerUpdate, handleAdventurerUpdate);
    createEventStream(world, AdventurerHit, handleAdventurerHit);
    createEventStream(world, MobUpdate, handleMobUpdate);
    createEventStream(world, MobHit, handleMobHit);
  }, [world, createEventStream]);

  return {};
};