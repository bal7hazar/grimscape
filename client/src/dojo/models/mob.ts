import { ComponentValue } from "@dojoengine/recs";

export class Mob {
  public realm_id: number;
  public dungeon_id: number;
  public adventurer_id: number;
  public x: number;
  public y: number;
  public id: number;
  public position: number;
  public beast: number;
  public health: number;

  constructor(mob: ComponentValue) {
    this.realm_id = mob.realm_id;
    this.dungeon_id = mob.dungeon_id;
    this.adventurer_id = mob.adventurer_id;
    this.x = mob.x;
    this.y = mob.y;
    this.id = mob.id;
    this.position = mob.position;
    this.beast = mob.beast;
    this.health = mob.health;
  }
}
