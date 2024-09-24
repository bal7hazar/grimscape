import GameManager from "../managers/game";
import Character from "./character";
import { Direction, DirectionType } from "@/dojo/types/direction";

export default class Explore extends Phaser.GameObjects.Container {
  public image: Phaser.GameObjects.Image;
  private direction = DirectionType.None;
  private pointer: { x: number, y: number } = { x: 0, y: 0 };
  private disabled: boolean = true;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    direction: DirectionType,
  ) {
    super(scene, x, y);

    // Parameters
    this.direction = direction;
    this.image = new Phaser.GameObjects.Image(scene, 0, 0, this.getAsset());
    this.image.setInteractive();
    this.image.setAlpha(0.5);
    this.image.setScale(0.5);

    // Listeners
    this.image.on('pointerdown', this.onPress, this);
    this.image.on('pointerup', this.onRelease, this);
    this.image.on("pointerover", this.onEnter, this);
    this.image.on("pointerout", this.onLeave, this);
 
    // Add to container
    this.add(this.image);
    this.sort("depth");
  }

  update(character: Character) {
    if (!this.visible) return;

    // Enable/Disable according to character distance
    const distance = Phaser.Math.Distance.Between(character.sprite.x, character.sprite.y, this.x, this.y);
    if (distance < 20 && this.disabled) {
        this.disabled = false;
        this.image.setAlpha(1);
    } else if (distance >= 20 && !this.disabled) {
        this.disabled = true;
        this.image.setAlpha(0.5);
    }
  }

  getAsset() {
    switch (this.direction) {
        case DirectionType.North:
            return "arrow-up";
        case DirectionType.South:
            return "arrow-down";
        case DirectionType.West:
            return "arrow-left";
        case DirectionType.East:
            return "arrow-right";
        default:
            return "";
        }
  }

  onPress(pointer: Phaser.Input.Pointer) {
    if (this.disabled) return;
    this.pointer = { x: pointer.x, y: pointer.y };
  }

  onRelease(pointer: Phaser.Input.Pointer) {
    if (this.disabled) return;
    if (Phaser.Math.Distance.Between(this.pointer.x, this.pointer.y, pointer.x, pointer.y) > 2) return;
    // Call transaction
    const direction = new Direction(this.direction);
    GameManager.getInstance().callMultiperform({ directions: [direction]});
    // Asset effect
    this.image.setScale(0.6);
    setTimeout(() => this.image.setScale(0.5), 100);
  }

  onEnter(pointer: Phaser.Input.Pointer) {
    if (this.disabled) return;
    this.image.setTint(0x00ff00);
    this.image.setAlpha(0.8);
  }

  onLeave(pointer: Phaser.Input.Pointer) {
    if (this.disabled) return;
    this.image.clearTint();
    this.image.setAlpha(1);
  }
}