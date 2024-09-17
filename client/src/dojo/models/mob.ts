import { ComponentValue } from "@dojoengine/recs";
import { ROOM_HEIGHT, ROOM_WIDTH } from "../constants";

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
  public base_health: number;

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
    this.base_health = mob.base_health;
  }

  getX() {
    return ROOM_WIDTH - 1 - this.position % ROOM_WIDTH + this.x * ROOM_WIDTH;
  }

  getY() {
    return ROOM_HEIGHT - 1 - Math.floor(this.position / ROOM_WIDTH) - this.y * ROOM_HEIGHT;
  }
}
