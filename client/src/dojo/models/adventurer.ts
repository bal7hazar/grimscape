import { ComponentValue } from "@dojoengine/recs";
import { ROOM_WIDTH } from "../constants";

export class Adventurer {
  public realm_id: number;
  public dungeon_id: number;
  public id: number;
  public x: number;
  public y: number;
  public position: number;
  public health: number;
  public xp: number;
  public gold: number;
  public weapon: number;
  public gears: number; // Head, Chest, Waist, Feet
  public attributes: number; // Str, Dex, Vit, Cha
  public seed: string;
  public player_id: string;

  constructor(adventurer: ComponentValue) {
    this.realm_id = adventurer.realm_id;
    this.dungeon_id = adventurer.dungeon_id;
    this.id = adventurer.id;
    this.x = adventurer.x;
    this.y = adventurer.y;
    this.position = adventurer.position;
    this.health = adventurer.health;
    this.xp = adventurer.xp;
    this.gold = adventurer.gold;
    this.weapon = adventurer.weapon;
    this.gears = adventurer.gears;
    this.attributes = adventurer.attributes;
    this.seed = `0x${adventurer.seed.toString(16)}`.replace('0x0x', '0x');
    this.player_id = `0x${adventurer.player_id.toString(16)}`.replace('0x0x', '0x');
  }

  getX() {
    return this.position % ROOM_WIDTH;
  }

  getY() {
    return Math.floor(this.position / ROOM_WIDTH);
  }
}
