import { useDojo } from "@/dojo/useDojo";
import { Component, ComponentUpdate, ComponentValue, World } from "@dojoengine/recs";
import { useCallback, useEffect } from "react";
import { defineComponentSystem } from "@dojoengine/recs";
import { Adventurer } from "@/dojo/models/adventurer";
import { Mob } from "@/dojo/models/mob";
import GameManager from "@/phaser/managers/game";
import { EventBus } from "@/phaser/EventBus";

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
    const identifier = update.value[0]?.id;
    // const adventurer = new Adventurer(update.value[0]?.adventurer as ComponentValue);
    const mob = new Mob(update.value[0]?.mob as ComponentValue);
    const damage = update.value[0]?.damage;
    const direction = update.value[0]?.direction;
    setTimeout(() => EventBus.emit("character-hit", identifier, direction), 50);
    setTimeout(() => EventBus.emit("mob-damage", identifier, mob, damage), 100);
  }
  
  const handleMobUpdate = (update: ComponentUpdate) => {
    const identifier = update.value[0]?.id;
    const mob = new Mob(update.value[0]?.mob as ComponentValue);
    // FIXME: checking if adventurer exists solve the issue of loading old events since it is not set at the loading time
    if (!GameManager.getInstance().adventurer || GameManager.getInstance().adventurer?.id !== mob.adventurer_id) return;
    GameManager.getInstance().addMobUpdate(identifier, mob);
  }

  const handleMobHit = (update: ComponentUpdate) => {
    const identifier = update.value[0]?.id;
    const mob = new Mob(update.value[0]?.mob as ComponentValue);
    const damage = update.value[0]?.damage;
    const direction = update.value[0]?.direction;
    setTimeout(() => EventBus.emit("mob-hit", identifier, mob, direction), 150);
    setTimeout(() => EventBus.emit("character-damage", identifier, damage), 200);
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
        if (update.value[0]?.time * 1000 <= Date.now() - 15000) return;
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