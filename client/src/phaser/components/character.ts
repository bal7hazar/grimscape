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
  private fighting: boolean = false;
  private animations: string[] = [];
  private events: number[] = [];

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    step: number,
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

    // Depths
    this.sprite.setDepth(2);

    // Add to container
    this.add(this.sprite);
    this.sort("depth");

    // Events
    EventBus.on("character-hit", (id: number, direction: number) => {
      if (this.events.includes(id)) return;
      this.events.push(id);
      this.onHit(direction);
    }, this);
    EventBus.on("character-damage", (id: number) => {
      if (this.events.includes(id)) return;
      this.events.push(id);
      this.onDamage();
    }, this);
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
    if (!this.visible || this.fighting) return;

    // Fighting animation cases
    if (!!this.animations.length) {
      this.fighting = true;
      this.animation = this.animations.shift() || "human-fighter-idle-down";
      this.sprite.play(this.animation, true);
      setTimeout(() => this.fighting = false, 1000);
      return;
    }

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
      GameManager.getInstance().setDirection(new Direction(DirectionType.East));
      const dx = Math.min(target.x - this.sprite.x, speed);
      this.sprite.x += dx;
    } else if (this.sprite.x > target.x) {
      this.play("LEFT");
      GameManager.getInstance().setDirection(new Direction(DirectionType.West));
      const dx = Math.min(this.sprite.x - target.x, speed);
      this.sprite.x -= dx;
    } else if (this.sprite.y < target.y) {
      this.play("DOWN");
      GameManager.getInstance().setDirection(new Direction(DirectionType.South));
      const dy = Math.min(target.y - this.sprite.y, speed);
      this.sprite.y += dy;
    } else if (this.sprite.y > target.y) {
      this.play("UP");
      GameManager.getInstance().setDirection(new Direction(DirectionType.North));
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

  onDamage() {
    const animation = `human-fighter-damage-${this.getDirection().toLowerCase()}`;
    this.animations.push(animation);
  }

  onHit(direction: number) {
    GameManager.getInstance().setDirection(Direction.from(direction));
    const animation = `human-fighter-hit-${this.getDirection().toLowerCase()}`;
    this.animations.push(animation);
  }
}