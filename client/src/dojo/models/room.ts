import { ComponentValue } from "@dojoengine/recs";
import * as pathfinding from "pathfinding";

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
  public grid: number[];
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
    const size = this.width * this.height;
    this.grid = BigInt(room.grid).toString(2).padStart(size, '0').split('').reverse().map((value: string) => parseInt(value));
    this.seed = `0x${room.seed.toString(16)}`.replace('0x0x', '0x');
  }

  isAvailable(position: number) {
    return !this.entities.includes(position);
  }

  convert(position: { x: number, y: number }) {
    const dx = (position.x % this.width + this.width) % this.width;
    const dy = (position.y % this.height + this.height) % this.height;
    const x = this.width - 1 - dx;
    const y = this.height - 1 - dy;
    return { x: x, y: y };
  }

  search(from: { x: number, y: number }, to: { x: number, y: number }) {
    // Check positions are in the same local room
    const dx = Math.floor(from.x / this.width) - Math.floor(to.x / this.width);
    const dy = Math.floor(from.y / this.height) - Math.floor(to.y / this.height);
    if (dx !== 0 || dy !== 0) {
      return [];
    }
    // Convert the positions to local coordinates
    const start = this.convert({ x: from.x % this.width, y: from.y % this.height });
    const target = this.convert({ x: to.x % this.width, y: to.y % this.height });
    // Reshape the grid from a 1d to a 2d array and invert the values
    const data = [];
    for (let i = 0; i < this.height; i++) {
      const values = this.grid.slice(i * this.width, i * this.width + this.width);
      data.push(values.map((value: number) => value === 0 ? 1 : 0));
    }
    // Find the path
    const grid = new pathfinding.Grid(data);
    const finder = new pathfinding.AStarFinder();
    const path = finder.findPath(start.x, start.y, target.x, target.y, grid);
    // Convert back into world coordinates
    const result = path.map((position: number[]) => {
      const world = this.convert({ x: position[0], y: position[1] });
      const x = world.x + Math.floor(from.x / this.width) * this.width;
      const y = world.y + Math.floor(from.y / this.height) * this.height;
      return { x: x, y: y };
    });
    return result;
  }
}
