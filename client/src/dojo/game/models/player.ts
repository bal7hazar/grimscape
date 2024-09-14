import { ComponentValue } from "@dojoengine/recs";
import { shortenHex } from "@dojoengine/utils";
import { shortString } from "starknet";

export class Player {
  public id: string;
  public gameId: string;
  public name: string;

  constructor(player: ComponentValue) {
    this.id = player.id;
    this.gameId = player.game_id;
    this.name = shortString.decodeShortString(player.name);
  }

  public getShortAddress(): string {
    return shortenHex(this.id);
  }
}
