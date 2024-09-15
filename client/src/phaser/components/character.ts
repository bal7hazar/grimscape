import { Adventurer } from "@/dojo/models/adventurer";
import GameManager from "../managers/game";

const SPEED: number = 1;

export default class Character extends Phaser.GameObjects.Container {
  public hitbox: Phaser.GameObjects.Rectangle;
  public character: Phaser.GameObjects.Sprite;
  private step: number;
  private offset: number;
  private target: { x: number; y: number } | null = null;
  private animation: string = "human-fighter-idle-down";
  private bounds: { minX: number; minY: number; maxX: number; maxY: number };
  private binded: boolean = false;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    offset: number,
    step: number,
    bounds: { minX: number; minY: number; maxX: number; maxY: number },
    binded: boolean,
  ) {
    super(scene, x, y);

    // Parameters
    this.step = step;
    this.offset = offset;
    this.bounds = bounds;
    this.binded = binded;

    // Images
    this.character = new Phaser.GameObjects.Sprite(
      scene,
      x,
      y,
      "human-fighter",
    );
    this.character.play(this.animation);

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
    this.character.setDepth(2);
    this.hitbox.setDepth(3);

    // Add to container
    this.add(this.character);
    this.add(this.hitbox);
    this.sort("depth");
  }

  bind() {
    // Keyboard arrows
    const up = this.scene.input.keyboard!.addKey("UP");
    const down = this.scene.input.keyboard!.addKey("DOWN");
    const left = this.scene.input.keyboard!.addKey("LEFT");
    const right = this.scene.input.keyboard!.addKey("RIGHT");

    const w = this.scene.input.keyboard!.addKey("W");
    const s = this.scene.input.keyboard!.addKey("S");
    const a = this.scene.input.keyboard!.addKey("A");
    const d = this.scene.input.keyboard!.addKey("D");

    // Listeners
    up.on("down", () => this.move("UP"));
    down.on("down", () => this.move("DOWN"));
    left.on("down", () => this.move("LEFT"));
    right.on("down", () => this.move("RIGHT"));
    w.on("down", () => this.move("UP"));
    s.on("down", () => this.move("DOWN"));
    a.on("down", () => this.move("LEFT"));
    d.on("down", () => this.move("RIGHT"));
  }

  update(adventurer: Adventurer) {
    if (!this.visible) return;

    // Death case
    if (!adventurer.health) {
      const x = this.step * adventurer.getX() + this.offset;
      const y = this.step * adventurer.getY() + this.offset;
      this.character.play("human-fighter-death", true);
      if (this.character.x !== x || this.character.y !== y) {
        this.character.x = x;
        this.character.y = y;
        this.hitbox.x = this.character.x;
        this.hitbox.y = this.character.y;
      }
      return;
    }

    // // Tx processing case
    // if (GameManager.getInstance().processing && this.binded) {
    //   return;
    // }

    // Waiting case
    if (!this.target && !GameManager.getInstance().processing) {
      // Sync real position
      const x = this.step * adventurer.getX() + this.offset;
      const y = this.step * adventurer.getY() + this.offset;
      // Pop up case
      if (this.character.x === 0 && this.character.y === 0) {
        this.character.x = x;
        this.character.y = y;
        this.hitbox.x = this.character.x;
        this.hitbox.y = this.character.y;
        return;
      }
      // To sync case
      if (this.character.x !== x || this.character.y !== y) {
        this.target = { x, y };
        return;
      }
      // Nothing case
      if (!this.animation.includes("human-fighter-idle")) {
        this.animation = `human-fighter-idle-${this.getDirection().toLowerCase()}`;
        this.character.play(this.animation);
      }
      return;
    }

    if (
      !!this.target &&
      this.character.x === this.target.x &&
      this.character.y === this.target.y
    ) {
      this.target = null;
      return;
    }

    if (!!this.target) {
      const speed = SPEED;
      if (this.character.x < this.target.x) {
        this.play("RIGHT");
        const dx = Math.min(this.target.x - this.character.x, speed);
        this.character.x += dx;
      } else if (this.character.x > this.target.x) {
        this.play("LEFT");
        const dx = Math.min(this.character.x - this.target.x, speed);
        this.character.x -= dx;
      } else if (this.character.y < this.target.y) {
        this.play("DOWN");
        const dy = Math.min(this.target.y - this.character.y, speed);
        this.character.y += dy;
      } else if (this.character.y > this.target.y) {
        this.play("UP");
        const dy = Math.min(this.character.y - this.target.y, speed);
        this.character.y -= dy;
      }
      this.hitbox.x = this.character.x;
      this.hitbox.y = this.character.y;
    }
  }

  play(direction: "UP" | "DOWN" | "LEFT" | "RIGHT") {
    const type = "move";
    const animation = `human-fighter-${type}-${direction.toLowerCase()}`;
    if (this.animation !== animation) {
      this.animation = animation;
      this.character.play(this.animation);
    }
  }

  move(direction: "UP" | "DOWN" | "LEFT" | "RIGHT") {
    if (!!this.target || !this.visible) return;
    const initial = { x: this.character.x, y: this.character.y };
    switch (direction) {
      case "UP":
        const up = { x: initial.x, y: initial.y - this.step };
        if (up.y < this.bounds.minY) return;
        this.target = up;
        GameManager.getInstance().setDirection(1);
        GameManager.getInstance().callMove();
        break;
      case "DOWN":
        const down = { x: initial.x, y: initial.y + this.step };
        if (down.y > this.bounds.maxY) return;
        this.target = down;
        GameManager.getInstance().setDirection(3);
        GameManager.getInstance().callMove();
        break;
      case "LEFT":
        const left = { x: initial.x - this.step, y: initial.y };
        if (left.x < this.bounds.minX) return;
        this.target = left;
        GameManager.getInstance().setDirection(4);
        GameManager.getInstance().callMove();
        break;
      case "RIGHT":
        const right = { x: initial.x + this.step, y: initial.y };
        if (right.x > this.bounds.maxX) return;
        this.target = right;
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