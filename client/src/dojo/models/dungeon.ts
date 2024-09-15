import { ComponentValue } from "@dojoengine/recs";

export class Dungeon {
  public realm_id: number;
  public id: number;
  public nonce: number;
  public claimer: string;
  public seed: string;

  constructor(dungeon: ComponentValue) {
    this.realm_id = dungeon.realm_id;
    this.id = dungeon.id;
    this.nonce = dungeon.nonce;
    this.claimer = `0x${dungeon.claimer.toString(16)}`.replace('0x0x', '0x');
    this.seed = `0x${dungeon.seed.toString(16)}`.replace('0x0x', '0x');
  }
}
