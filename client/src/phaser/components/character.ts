import { Adventurer } from "@/dojo/models/adventurer";
import GameManager from "../managers/game";

const SPEED: number = 1;

export default class Character extends Phaser.GameObjects.Container {
  public hitbox: Phaser.GameObjects.Rectangle;
  public sprite: Phaser.GameObjects.Sprite;
  private step: number;
  private offset: { x: number, y: number };
  private targets: { x: number; y: number }[] = [];
  private animation: string = "human-fighter-idle-down";
  private bounds: { minX: number; minY: number; maxX: number; maxY: number };
  private binded: boolean = false;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    step: number,
    bounds: { minX: number; minY: number; maxX: number; maxY: number },
    binded: boolean,
  ) {
    super(scene, x, y);

    // Parameters
    this.step = step;
    this.offset = { x: step / 2, y:  2 * step / 5 };
    this.bounds = bounds;
    this.binded = binded;

    // Images
    this.sprite = new Phaser.GameObjects.Sprite(
      scene,
      x,
      y,
      "human-fighter",
    );
    this.sprite.play(this.animation);

    // Hitbox
    this.hitbox = new Phaser.GameObjects.Rectangle(scene, x, y, 1, 1).setOrigin(
      0.5,
      0.5,
    );

    // Bindings
    if (binded) {
      this.bind();
    }

    // Depths
    this.sprite.setDepth(2);
    this.hitbox.setDepth(3);

    // Add to container
    this.add(this.sprite);
    this.add(this.hitbox);
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
        this.hitbox.x = this.sprite.x;
        this.hitbox.y = this.sprite.y;
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
        this.hitbox.x = this.sprite.x;
        this.hitbox.y = this.sprite.y;
        return;
      }
      // To sync case
      if (this.sprite.x !== x || this.sprite.y !== y) {
        const target = { x, y };
        this.targets.push(target);
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
    this.hitbox.x = this.sprite.x;
    this.hitbox.y = this.sprite.y;
  }

  play(direction: "UP" | "DOWN" | "LEFT" | "RIGHT") {
    const type = "move";
    const animation = `human-fighter-${type}-${direction.toLowerCase()}`;
    if (this.animation !== animation) {
      this.animation = animation;
      this.sprite.play(this.animation);
    }
  }

  move(direction: "UP" | "DOWN" | "LEFT" | "RIGHT") {
    if (this.targets.length > 0 || !this.visible) return;
    const initial = { x: this.sprite.x, y: this.sprite.y };
    switch (direction) {
      case "UP":
        const up = { x: initial.x, y: initial.y - this.step };
        if (up.y < this.bounds.minY) return;
        this.targets.push(up);
        GameManager.getInstance().setDirection(1);
        GameManager.getInstance().callMove();
        break;
      case "DOWN":
        const down = { x: initial.x, y: initial.y + this.step };
        if (down.y > this.bounds.maxY) return;
        this.targets.push(down);
        GameManager.getInstance().setDirection(3);
        GameManager.getInstance().callMove();
        break;
      case "LEFT":
        const left = { x: initial.x - this.step, y: initial.y };
        if (left.x < this.bounds.minX) return;
        this.targets.push(left);
        GameManager.getInstance().setDirection(4);
        GameManager.getInstance().callMove();
        break;
      case "RIGHT":
        const right = { x: initial.x + this.step, y: initial.y };
        if (right.x > this.bounds.maxX) return;
        this.targets.push(right);
        GameManager.getInstance().setDirection(2);
        GameManager.getInstance().callMove();
        break;
    }
  }

  getDirection() {
    switch (GameManager.getInstance().getDirection()) {
      case 1:
        return "UP";
      case 2:
        return "RIGHT";
      case 3:
        return "DOWN";
      case 4:
        return "LEFT";
      default:
        return "DOWN";
    }
  }
}