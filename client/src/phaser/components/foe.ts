import { Mob } from "@/dojo/models/mob";
import { EventBus } from "../EventBus";
import { Direction } from "@/dojo/types/direction";
import GameManager from "../managers/game";

const SPEED: number = 2;

export default class Foe extends Phaser.GameObjects.Container {
  public sprite: Phaser.GameObjects.Sprite;
  private step: number;
  private offset: { x: number, y: number };
  private targets: { order: number, x: number; y: number }[] = [];
  private animation: string = "skeleton-worker-idle-down";
  private direction: number = 3;
  private fighting: boolean = false;
  private animations: string[] = [];
  private identifier: string;
  private events: number[] = [];
  private hitbox: Phaser.GameObjects.Rectangle;
  private pointer: { x: number, y: number } = { x: 0, y: 0 };
  private mob: Mob;
  private text: Phaser.GameObjects.Text;


  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    step: number,
    identifier: string,
    mob: Mob,
  ) {
    super(scene, x, y);

    // Parameters
    this.identifier = identifier;
    this.step = step;
    this.mob = mob;
    this.offset = { x: step / 2, y:  2 * step / 5 };

    // Images
    this.sprite = new Phaser.GameObjects.Sprite(
      scene,
      x,
      y,
      "skeleton-worker",
    );
    this.sprite.play(this.animation);

    // Hitbox
    this.hitbox = new Phaser.GameObjects.Rectangle(
      scene,
      x,
      y,
      12,
      12,
    );
    this.hitbox.setInteractive();
  
    // Text damage
    this.text = scene.add.text(x, y, "", { color: "#ff0000", fontSize: "8px" });
    this.text.setOrigin(0.5);
    this.text.setDepth(3);

    // Listeners
    this.hitbox.on("pointerdown", this.onPress, this);
    this.hitbox.on("pointerup", this.onRelease, this);
    this.hitbox.on("pointerover", this.onEnter, this);
    this.hitbox.on("pointerout", this.onlLeave, this);

    // Depths
    this.sprite.setDepth(2);
    this.hitbox.setDepth(3);

    // Add to container
    this.add(this.sprite);
    this.add(this.hitbox);
    this.add(this.text);
    this.sort("depth");

    // Events
    EventBus.on("mob-hit", (id: number, mob: Mob, direction: number) => {
      if (this.events.includes(id)) return;
      this.events.push(id);
      this.onHit(mob, direction);
    }, this);
    EventBus.on("mob-damage", (id: number, mob: Mob, damage: number) => {
      if (this.events.includes(id)) return;
      this.events.push(id);
      this.onDamage(mob, damage);
    }, this);
  }

  addTarget(order: number, mob: Mob) {
    if (!this.visible || !mob || !mob.health) return;
    // Add target to the list
    const x = this.step * mob.getX() + this.offset.x;
    const y = this.step * mob.getY() + this.offset.y;
    this.targets.push({ order, x, y });
    // Sort targets by ascending order and dedup
    this.targets = this.targets
      .sort((a, b) => a.order - b.order)
      .filter((target, index, self) => self.findIndex((t) => t.x === target.x && t.y === target.y && t.order === target.order) === index);
  }


  update(mob: Mob) {
    this.mob = mob;
    if (!this.visible || this.fighting) return;

    // Fighting animation cases
    if (!!this.animations.length) {
      this.fighting = true;
      this.animation = this.animations.shift() || "skeleton-worker-idle-down";
      this.sprite.play(this.animation, true);
      setTimeout(() => this.fighting = false, 1000);
      return;
    }

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
        this.hitbox.x = x;
        this.hitbox.y = y;
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
      this.hitbox.x += dx;
    } else if (this.sprite.x > target.x) {
      this.play("LEFT");
      const dx = Math.min(this.sprite.x - target.x, speed);
      this.sprite.x -= dx;
      this.hitbox.x -= dx;
    } else if (this.sprite.y < target.y) {
      this.play("DOWN");
      const dy = Math.min(target.y - this.sprite.y, speed);
      this.sprite.y += dy;
      this.hitbox.y += dy;
    } else if (this.sprite.y > target.y) {
      this.play("UP");
      const dy = Math.min(this.sprite.y - target.y, speed);
      this.sprite.y -= dy;
      this.hitbox.y -= dy;
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

  onDamage(mob: Mob, damage: number) {
    const identifier = `${mob.realm_id}-${mob.dungeon_id}-${mob.adventurer_id}-${mob.x}-${mob.y}-${mob.id}`;
    if (identifier != this.identifier) return;
    // If the entity is performing a move, wait and try later
    if (this.targets.length) {
      setTimeout(() => this.onDamage(mob, damage), 200);
      return;
    }
    const animation = `skeleton-worker-damage-${this.getDirection().toLowerCase()}`;
    this.animations.push(animation);
    // Create a damage text above the character for a short time and moving up and fading out
    this.text.setText(`-${damage}`);
    this.text.x = this.sprite.x;
    this.text.y = this.sprite.y - 10;
    this.text.setAlpha(1);
    setTimeout(() => {
      this.scene.tweens.add({
        targets: this.text,
        y: this.text.y - 10,
        alpha: 0,
        duration: 1000,
        ease: "Linear",
      });
    }, 100);
  }

  onHit(mob: Mob, direction: number) {
    const identifier = `${mob.realm_id}-${mob.dungeon_id}-${mob.adventurer_id}-${mob.x}-${mob.y}-${mob.id}`;
    if (identifier != this.identifier) return;
    // If the entity is performing a move, wait and try later
    if (this.targets.length) {
      setTimeout(() => this.onHit(mob, direction), 200);
      return;
    }
    this.direction = direction;
    const animation = `skeleton-worker-hit-${this.getDirection().toLowerCase()}`;
    this.animations.push(animation);
  }

  onPress(pointer: Phaser.Input.Pointer) {
    this.pointer = { x: pointer.x, y: pointer.y };
  }

  onRelease(pointer: Phaser.Input.Pointer) {
    if (Phaser.Math.Distance.Between(this.pointer.x, this.pointer.y, pointer.x, pointer.y) > 2) return;
    const adventurer = GameManager.getInstance().adventurer;
    if (!adventurer) return;
    const direction = Direction.between(adventurer.position, this.mob.position);
    GameManager.getInstance().callMultiperform({ directions: [direction] });
  }

  onEnter(pointer: Phaser.Input.Pointer) {
    this.sprite.setAlpha(0.5);
  }

  onlLeave(pointer: Phaser.Input.Pointer) {
    this.sprite.clearAlpha();
  }
}