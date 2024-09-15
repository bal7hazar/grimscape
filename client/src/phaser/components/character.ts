import { Adventurer } from "@/dojo/models/adventurer";
import GameManager from "../managers/game";

const SPEED: number = 1;
const ALPHA_SPEED: number = 0.01;

export default class Character extends Phaser.GameObjects.Container {
  public hidden: boolean = false;
  public hitbox: Phaser.GameObjects.Rectangle;
  public character: Phaser.GameObjects.Sprite;
  private shadow1: Phaser.GameObjects.Sprite;
  private shadow2: Phaser.GameObjects.Sprite;
  private shadow3: Phaser.GameObjects.Sprite;
  private smoke: Phaser.GameObjects.Sprite;
  private step: number;
  private offset: number;
  private target: { x: number; y: number } | null = null;
  private animation: string = "assassin-black-idle";
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
      "assassin-black",
    );
    this.character.play(this.animation);
    this.shadow1 = new Phaser.GameObjects.Sprite(scene, x, y, "assassin-black");
    this.shadow1.setTint(0x777777);
    this.shadow1.setVisible(false);
    this.shadow2 = new Phaser.GameObjects.Sprite(scene, x, y, "assassin-black");
    this.shadow2.setTint(0x444444);
    this.shadow2.setVisible(false);
    this.shadow3 = new Phaser.GameObjects.Sprite(scene, x, y, "assassin-black");
    this.shadow3.setTint(0x111111);
    this.shadow3.setVisible(false);
    this.smoke = new Phaser.GameObjects.Sprite(scene, x, y, "smoke");
    this.smoke.setVisible(false);

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
    this.shadow2.setDepth(0);
    this.shadow1.setDepth(1);
    this.character.setDepth(2);
    this.hitbox.setDepth(3);
    this.smoke.setDepth(4);

    // Add to container
    this.add(this.character);
    this.add(this.shadow1);
    this.add(this.shadow2);
    this.add(this.hitbox);
    this.add(this.smoke);
    this.sort("depth");
  }

  bind() {
    // Keyboard arrows
    const Up = this.scene.input.keyboard!.addKey("UP");
    const Down = this.scene.input.keyboard!.addKey("DOWN");
    const Left = this.scene.input.keyboard!.addKey("LEFT");
    const Right = this.scene.input.keyboard!.addKey("RIGHT");

    // Listeners
    Up.on("down", () => this.move("UP"));
    Down.on("down", () => this.move("DOWN"));
    Left.on("down", () => this.move("LEFT"));
    Right.on("down", () => this.move("RIGHT"));
  }

  update(adventurer: Adventurer) {
    if (!this.visible) return;

    if (!adventurer.health) {
      const x = this.step * adventurer.getX() + this.offset;
      const y = this.step * adventurer.getY() + this.offset;
      this.character.play("assassin-black-death", true);
      if (this.character.x !== x || this.character.y !== y) {
        this.character.x = x;
        this.character.y = y;
        this.hitbox.x = this.character.x;
        this.hitbox.y = this.character.y;
      }
      if (this.alpha > 0) {
        const alpha = this.alpha - Math.min(this.alpha, ALPHA_SPEED);
        this.setAlpha(alpha);
      }
      return;
    }

    if (GameManager.getInstance().processing && this.binded) {
      this.stand("DOWN");
      return;
    }

    if (!this.target) {
      // Sync real position
      const x = this.step * adventurer.getX() + this.offset;
      const y = this.step * adventurer.getY() + this.offset;
      if (this.character.x !== x || this.character.y !== y) {
        this.target = { x, y };
        return;
      }
      // Update animation
      if (this.animation !== "assassin-black-idle") {
        this.animation = "assassin-black-idle";
        this.character.play(this.animation);
      }
      return;
    }

    if (
      this.character.x === this.target.x &&
      this.character.y === this.target.y
    ) {
      this.target = null;
      setTimeout(() => this.shadow1.setVisible(false), 75);
      setTimeout(() => this.shadow2.setVisible(false), 125);
      setTimeout(() => this.shadow3.setVisible(false), 175);
      return;
    }

    const speed = this.hidden ? SPEED / 2 : SPEED;
    this.shadow1.setVisible(!this.hidden);
    this.shadow2.setVisible(!this.hidden);
    this.shadow3.setVisible(!this.hidden);
    if (this.character.x < this.target.x) {
      this.play("RIGHT");
      const dx = Math.min(this.target.x - this.character.x, speed);
      this.character.x += dx;
      setTimeout(() => (this.shadow1.x += dx), 75);
      setTimeout(() => (this.shadow2.x += dx), 125);
      setTimeout(() => (this.shadow3.x += dx), 175);
    } else if (this.character.x > this.target.x) {
      this.play("LEFT");
      const dx = Math.min(this.character.x - this.target.x, speed);
      this.character.x -= dx;
      setTimeout(() => (this.shadow1.x -= dx), 75);
      setTimeout(() => (this.shadow2.x -= dx), 125);
      setTimeout(() => (this.shadow3.x -= dx), 175);
    } else if (this.character.y < this.target.y) {
      this.play("DOWN");
      const dy = Math.min(this.target.y - this.character.y, speed);
      this.character.y += dy;
      setTimeout(() => (this.shadow1.y += dy), 75);
      setTimeout(() => (this.shadow2.y += dy), 125);
      setTimeout(() => (this.shadow3.y += dy), 175);
    } else if (this.character.y > this.target.y) {
      this.play("UP");
      const dy = Math.min(this.character.y - this.target.y, speed);
      this.character.y -= dy;
      setTimeout(() => (this.shadow1.y -= dy), 75);
      setTimeout(() => (this.shadow2.y -= dy), 125);
      setTimeout(() => (this.shadow3.y -= dy), 175);
    }
    this.hitbox.x = this.character.x;
    this.hitbox.y = this.character.y;
    this.smoke.x = this.character.x;
    this.smoke.y = this.character.y;
  }

  stand(direction: "UP" | "DOWN" | "LEFT" | "RIGHT") {
    const animation = this.hidden
      ? `assassin-black-${direction.toLowerCase()}`
      : `assassin-black-stand-${direction.toLowerCase()}`;
    if (this.animation !== animation) {
      this.animation = animation;
      this.character.play(this.animation);
    }
  }

  play(direction: "UP" | "DOWN" | "LEFT" | "RIGHT") {
    const type = this.hidden ? "move" : "dash";
    const animation = `assassin-black-${type}-${direction.toLowerCase()}`;
    if (this.animation !== animation) {
      this.animation = animation;
      this.character.play(this.animation);
      setTimeout(() => this.shadow1.play(this.animation), 75);
      setTimeout(() => this.shadow2.play(this.animation), 125);
      setTimeout(() => this.shadow3.play(this.animation), 175);
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
}