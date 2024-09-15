import { ComponentValue } from "@dojoengine/recs";

export class Room {
  public realm_id: number;
  public dungeon_id: number;
  public adventurer_id: number;
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public mob_count: number;
  public entities: bigint;
  public grid: bigint;
  public seed: string;

  constructor(realm: ComponentValue) {
    this.realm_id = realm.realm_id;
    this.dungeon_id = realm.dungeon_id;
    this.adventurer_id = realm.adventurer_id;
    this.x = realm.x;
    this.y = realm.y;
    this.width = realm.width;
    this.height = realm.height;
    this.mob_count = realm.mob_count;
    this.entities = BigInt(realm.entities);
    this.grid = BigInt(realm.grid);
    this.seed = `0x${realm.seed.toString(16)}`.replace('0x0x', '0x');
  }
}
