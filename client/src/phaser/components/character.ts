import { Adventurer } from "@/dojo/models/adventurer";
import GameManager from "../managers/game";
import { WALLS } from "../helpers/tilemap";
import { EventBus } from "../EventBus";
import { Direction, DirectionType } from "@/dojo/types/direction";

const SPEED: number = 1;

export default class Character extends Phaser.GameObjects.Container {
  public sprite: Phaser.GameObjects.Sprite;
  private step: number;
  private offset: { x: number, y: number };
  private targets: { order: number, x: number; y: number }[] = [];
  private animation: string = "human-fighter-idle-down";
  private layers: Phaser.Tilemaps.TilemapLayer[] = [];

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    step: number,
    binded: boolean,
  ) {
    super(scene, x, y);

    // Parameters
    this.step = step;
    this.offset = { x: step / 2, y:  2 * step / 5 };

    // Images
    this.sprite = new Phaser.GameObjects.Sprite(
      scene,
      x,
      y,
      "human-fighter",
    );
    this.sprite.play(this.animation);

    // Bindings
    if (binded) {
      this.bind();
    }

    // Depths
    this.sprite.setDepth(2);

    // Add to container
    this.add(this.sprite);
    this.sort("depth");
  }

  bind() {
    // Keyboard arrows
    const up = this.scene.input.keyboard!.addKey("UP");
    const down = this.scene.input.keyboard!.addKey("DOWN");
    const left = this.scene.input.keyboard!.addKey("LEFT");
    const right = this.scene.input.keyboard!.addKey("RIGHT");

    // const w = this.scene.input.keyboard!.addKey("W");
    // const s = this.scene.input.keyboard!.addKey("S");
    // const a = this.scene.input.keyboard!.addKey("A");
    // const d = this.scene.input.keyboard!.addKey("D");

    // Listeners
    up.on("down", () => this.move("UP"));
    down.on("down", () => this.move("DOWN"));
    left.on("down", () => this.move("LEFT"));
    right.on("down", () => this.move("RIGHT"));
    // w.on("down", () => this.move("UP"));
    // s.on("down", () => this.move("DOWN"));
    // a.on("down", () => this.move("LEFT"));
    // d.on("down", () => this.move("RIGHT"));
  }

  addTarget(order: number, adventurer: Adventurer) {
    if (!this.visible || !adventurer) return;
    // Add target to the list
    const x = this.step * adventurer.getX() + this.offset.x;
    const y = this.step * adventurer.getY() + this.offset.y;
    this.targets.push({ order, x, y });
    // Sort targets by ascending order
    this.targets = this.targets.sort((a, b) => a.order - b.order);
  }

  update(adventurer: Adventurer) {
    if (!this.visible) return;

    // Death case
    if (!adventurer.health) {
      const x = this.step * adventurer.getX() + this.offset.x;
      const y = this.step * adventurer.getY() + this.offset.y;
      this.sprite.play("human-fighter-death", true);
      if (this.sprite.x !== x || this.sprite.y !== y) {
        this.sprite.x = x;
        this.sprite.y = y;
      }
      return;
    }

    // Waiting case
    if (this.targets.length === 0) {
      // Sync real position
      const x = this.step * adventurer.getX() + this.offset.x;
      const y = this.step * adventurer.getY() + this.offset.y;
      // Pop up case
      if (this.sprite.x === 0 && this.sprite.y === 0) {
        this.sprite.x = x;
        this.sprite.y = y;
        return;
      }
      // To sync case
      if (this.sprite.x !== x || this.sprite.y !== y) {
        this.addTarget(999, adventurer);
        return;
      }
      // Nothing case
      if (!this.animation.includes("human-fighter-idle")) {
        this.animation = `human-fighter-idle-${this.getDirection().toLowerCase()}`;
        this.sprite.play(this.animation);
      }
      return;
    }

    // Standing at target case
    const target = this.targets[0];
    if (
      this.sprite.x === target.x &&
      this.sprite.y === target.y
    ) {
      // Remove first element of the targets
      this.targets.shift();
      return;
    }

    // Moving to target case
    const speed = SPEED;
    if (this.sprite.x < target.x) {
      this.play("RIGHT");
      const dx = Math.min(target.x - this.sprite.x, speed);
      this.sprite.x += dx;
    } else if (this.sprite.x > target.x) {
      this.play("LEFT");
      const dx = Math.min(this.sprite.x - target.x, speed);
      this.sprite.x -= dx;
    } else if (this.sprite.y < target.y) {
      this.play("DOWN");
      const dy = Math.min(target.y - this.sprite.y, speed);
      this.sprite.y += dy;
    } else if (this.sprite.y > target.y) {
      this.play("UP");
      const dy = Math.min(this.sprite.y - target.y, speed);
      this.sprite.y -= dy;
    }

    // Update camera
    EventBus.emit("center-camera");
  }

  play(direction: "UP" | "DOWN" | "LEFT" | "RIGHT") {
    const type = "move";
    const animation = `human-fighter-${type}-${direction.toLowerCase()}`;
    if (this.animation !== animation) {
      this.animation = animation;
      this.sprite.play(this.animation);
    }
  }

  collision(x: number, y: number) {
    const tiles = this.layers.map((layer) => layer.getTileAtWorldXY(x, y, true)).filter((tile) => !!tile);
    return tiles.some((tile) => WALLS.includes(tile.index));
  }

  available(position: number, direction: Direction) {
    const room = GameManager.getInstance().room;
    const entities = room?.entities || [];
    const next = direction.next(position, room?.width || 0);
    return !entities.includes(next);
  }

  move(direction: "UP" | "DOWN" | "LEFT" | "RIGHT") {
    const adventurer = GameManager.getInstance().adventurer;
    if (this.targets.length > 0 || !this.visible || !this.layers || !adventurer) return;
    const initial = { x: this.sprite.x, y: this.sprite.y };
    switch (direction) {
      case "UP":
        const north = new Direction(DirectionType.North);
        const up = { x: initial.x, y: initial.y - this.step };
        if (this.collision(up.x, up.y)) return;
        if (this.available(adventurer.position, north)) {
          this.targets.push({ order: 999, x: up.x, y: up.y});
        }
        GameManager.getInstance().setDirection(north);
        GameManager.getInstance().callPerform({ move: this.available(adventurer.position, north) });
        break;
      case "DOWN":
        const south = new Direction(DirectionType.South);
        const down = { x: initial.x, y: initial.y + this.step };
        if (this.collision(down.x, down.y)) return;
        if (this.available(adventurer.position, south)) {
          this.targets.push({ order: 999, x: down.x, y: down.y});
        }
        GameManager.getInstance().setDirection(south);
        GameManager.getInstance().callPerform({ move: this.available(adventurer.position, south) });
        break;
      case "LEFT":
        const west = new Direction(DirectionType.West);
        const left = { x: initial.x - this.step, y: initial.y };
        if (this.collision(left.x, left.y)) return;
        if (this.available(adventurer.position, west)) {
          this.targets.push({ order: 999, x: left.x, y: left.y});
        }
        GameManager.getInstance().setDirection(west);
        GameManager.getInstance().callPerform({ move: this.available(adventurer.position, west) });
        break;
      case "RIGHT":
        const east = new Direction(DirectionType.East);
        const right = { x: initial.x + this.step, y: initial.y };
        if (this.collision(right.x, right.y)) return;
        if (this.available(adventurer.position, east)) {
          this.targets.push({ order: 999, x: right.x, y: right.y});
        }
        GameManager.getInstance().setDirection(east);
        GameManager.getInstance().callPerform({ move: this.available(adventurer.position, east) });
        break;
    }
  }

  setCollision(layers: Phaser.Tilemaps.TilemapLayer[]) {
    this.layers = layers;
  }

  getDirection() {
    const direction = GameManager.getInstance().getDirection().value;
    switch (direction) {
      case DirectionType.North:
        return "UP";
      case DirectionType.East:
        return "RIGHT";
      case DirectionType.South:
        return "DOWN";
      case DirectionType.West:
        return "LEFT";
      default:
        return "DOWN";
    }
  }
}