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
  public entities: number[];
  public grid: bigint;
  public seed: string;

  constructor(room: ComponentValue) {
    this.realm_id = room.realm_id;
    this.dungeon_id = room.dungeon_id;
    this.adventurer_id = room.adventurer_id;
    this.x = room.x;
    this.y = room.y;
    this.width = room.width;
    this.height = room.height;
    this.mob_count = room.mob_count;
    this.entities = BigInt(room.entities).toString(2).split("").reverse().map((x, i) => !!parseInt(x) ? i : null).filter(x => x !== null);
    this.grid = BigInt(room.grid);
    this.seed = `0x${room.seed.toString(16)}`.replace('0x0x', '0x');
  }

  isAvailable(position: number) {
    return !this.entities.includes(position);
  }
}
