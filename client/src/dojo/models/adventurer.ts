import { ComponentValue } from "@dojoengine/recs";
import { ROOM_HEIGHT, ROOM_WIDTH } from "../constants";
import { Direction, DirectionType } from "../types/direction";
import { Packer } from "../helpers/packer";

export class Adventurer {
  public realm_id: number;
  public dungeon_id: number;
  public id: number;
  public x: number;
  public y: number;
  public position: number;
  public health: number;
  public base_health: number;
  public xp: number;
  public gold: number;
  public weapon: number;
  public attribute_points: number;
  public gears: number[];
  public attributes: number[];
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
    this.base_health = adventurer.base_health;
    this.xp = adventurer.xp;
    this.gold = adventurer.gold;
    this.weapon = adventurer.weapon;
    this.attribute_points = adventurer.attribute_points;
    this.gears = Packer.unpack(BigInt(adventurer.gears), 8n);
    this.attributes = Packer.unpack(BigInt(adventurer.attributes), 8n);
    this.seed = `0x${adventurer.seed.toString(16)}`.replace('0x0x', '0x');
    this.player_id = `0x${adventurer.player_id.toString(16)}`.replace('0x0x', '0x');
  }

  isDead() {
    return this.health == 0;
  }

  getStrength() {
    return this.attributes.length < 1 ? 0 : this.attributes[0];
  }

  getDexterity() {
    return this.attributes.length < 2 ? 0 : this.attributes[1];
  }

  getVitality() {
    return this.attributes.length < 3 ? 0 : this.attributes[2];
  }

  getIntelligence() {
    return this.attributes.length < 4 ? 0 : this.attributes[3];
  }

  getWisdom() {
    return this.attributes.length < 5 ? 0 : this.attributes[4];
  }

  getCharisma() {
    return this.attributes.length < 6 ? 0 : this.attributes[5];
  }

  getX() {
    return ROOM_WIDTH - 1 - this.position % ROOM_WIDTH + this.x * ROOM_WIDTH;
  }

  getY() {
    return ROOM_HEIGHT - 1 - Math.floor(this.position / ROOM_WIDTH) - this.y * ROOM_HEIGHT;
  }

  getLevel() {
    // Sqrt of XP and min 1
    return Math.max(1, Math.floor(Math.sqrt(this.xp)));
  }

  getExperience() {
    return this.xp - Math.pow(this.getLevel(), 2);
  }

  getTotalExperience() {
    return this.getNextExperience(this.getLevel());
  }

  getNextExperience(level: number) {
    return Math.pow(level + 1, 2) - Math.pow(level, 2);
  }

  getNext(direction: DirectionType) {
    let position = this.position;
    const localX = position % ROOM_WIDTH;
    const localY = Math.floor(position / ROOM_WIDTH);
    let x = this.x;
    let y = this.y;
    switch (direction) {
      case DirectionType.North:
        if (localY < ROOM_HEIGHT - 1) {
          position += ROOM_WIDTH;
        } else {
          y += 1;
          position = localX;
        }
        break;
      case DirectionType.East:
        if (localX > 0) {
          position -= 1;
        } else {
          x += 1;
          position = ROOM_WIDTH * localY + ROOM_WIDTH - 1;
        }
        break;
      case DirectionType.South:
        if (localY > 0) {
          position -= ROOM_WIDTH;
        } else {
          y -= 1;
          position = ROOM_WIDTH * (ROOM_HEIGHT - 1) + localX;
        }
        break;
      case DirectionType.West:
        if (localX < ROOM_WIDTH - 1) {
          position += 1;
        } else {
          x -= 1;
          position = ROOM_WIDTH * localY;
        }
        break;
      default:
        break;
    };
    return ({ position, x, y });
  }
}
