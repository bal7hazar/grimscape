import { Mob } from "@/dojo/models/mob";

const SPEED: number = 1;

export default class Foe extends Phaser.GameObjects.Container {
  public sprite: Phaser.GameObjects.Sprite;
  private step: number;
  private offset: { x: number, y: number };
  private targets: { x: number; y: number }[] = [];
  private animation: string = "skeleton-worker-idle-down";
  private direction: number = 3;

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
      "skeleton-worker",
    );
    this.sprite.play(this.animation);

    // Depths
    this.sprite.setDepth(2);

    // Add to container
    this.add(this.sprite);
    this.sort("depth");
  }

  update(mob: Mob) {
    if (!this.visible) return;

    // Death case
    if (!mob.health) {
      const x = this.step * mob.getX() + this.offset.x;
      const y = this.step * mob.getY() + this.offset.y;
      this.sprite.play("skeleton-worker-death", true);
      if (this.sprite.x !== x || this.sprite.y !== y) {
        this.sprite.x = x;
        this.sprite.y = y;
      }
      return;
    }

    // Waiting case
    if (this.targets.length === 0) {
      // Sync real position
      const x = this.step * mob.getX() + this.offset.x;
      const y = this.step * mob.getY() + this.offset.y;
      // Pop up case
      if (this.sprite.x === 0 && this.sprite.y === 0) {
        this.sprite.x = x;
        this.sprite.y = y;
        return;
      }
      // To sync case
      if (this.sprite.x !== x || this.sprite.y !== y) {
        const target = { x, y };
        this.targets.push(target);
        return;
      }
      // Nothing case
      if (!this.animation.includes("skeleton-worker-idle")) {
        this.animation = `skeleton-worker-idle-${this.getDirection().toLowerCase()}`;
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
  }

  play(direction: "UP" | "DOWN" | "LEFT" | "RIGHT") {
    const type = "move";
    const animation = `skeleton-worker-${type}-${direction.toLowerCase()}`;
    if (this.animation !== animation) {
      this.animation = animation;
      this.sprite.play(this.animation);
    }
  }

  getDirection() {
    switch (this.direction) {
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