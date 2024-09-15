import { ComponentValue } from "@dojoengine/recs";
import { shortenHex } from "@dojoengine/utils";
import { shortString } from "starknet";

export class Player {
  public id: string;
  public adventurerId: number;
  public name: string;

  constructor(player: ComponentValue) {
    this.id = `0x${player.id.toString(16)}`.replace('0x0x', '0x');
    this.adventurerId = player.adventurer_id;
    this.name = shortString.decodeShortString(player.name);
  }

  public getShortAddress(): string {
    return shortenHex(this.id);
  }
}
