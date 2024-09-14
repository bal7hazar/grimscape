import { ComponentValue } from "@dojoengine/recs";
import { Packer } from "../helpers/packer";
import { WORK_BIT_COUNT } from "../constants";

export class Game {
  public id: string;
  public over: boolean;
  public score: number;
  public action: number;
  public gold: number;
  public buildings: number[];
  public constructions: number[];
  public structures: number[];
  public builders: number[];
  public workers: number[];
  public works: number[];
  public seed: bigint;
  public player_id: string;

  constructor(game: ComponentValue) {
    this.id = game.id;
    this.over = game.over ? true : false;
    this.score = game.score;
    this.action = game.action;
    this.gold = game.gold;
    this.builders = Packer.unpack(
      BigInt(game.builders) & ~BigInt(game.workers),
      BigInt(1),
    )
      .map((value, index) => (value ? index + 1 : 0))
      .filter((id) => !!id);
    this.buildings = Packer.unpack(
      BigInt(game.buildings) & ~BigInt(game.constructions),
      BigInt(1),
    )
      .map((value, index) => (value ? index + 1 : 0))
      .filter((id) => !!id);
    this.constructions = Packer.unpack(BigInt(game.constructions), BigInt(1))
      .map((value, index) => (value ? index + 1 : 0))
      .filter((id) => !!id);
    this.structures = Packer.unpack(BigInt(game.structures), BigInt(1))
      .map((value, index) => (value ? index + 1 : 0))
      .filter((id) => !!id);
    this.workers = Packer.unpack(BigInt(game.workers), BigInt(1))
      .map((value, index) => (value ? index + 1 : 0))
      .filter((id) => !!id);
    this.works = Packer.sized_unpack(
      BigInt(game.works),
      BigInt(WORK_BIT_COUNT),
      42,
    );
    this.seed = game.seed;
    this.player_id = game.player_id.toString(16);
  }

  public isOver(): boolean {
    return this.over;
  }
}
