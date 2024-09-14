import Selector from "../elements/selector";
import { EventBus } from "../EventBus";

export default class ConstructionMenu extends Phaser.GameObjects.Container {
  protected banner: Phaser.GameObjects.Image;
  protected carved: Phaser.GameObjects.Image;
  protected ribbon: Phaser.GameObjects.Image;
  protected building: Phaser.GameObjects.Image;
  protected label: Phaser.GameObjects.Text;
  protected selector: Selector;
  protected worker1: Phaser.GameObjects.Sprite;
  protected worker2: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    // Images
    this.banner = new Phaser.GameObjects.Image(
      scene,
      0,
      0,
      "banner-v-w7-h5",
    ).setOrigin(0.5, 1);
    this.carved = new Phaser.GameObjects.Image(
      scene,
      0,
      -64,
      "carved-w5-h3",
    ).setOrigin(0.5, 1);
    this.ribbon = new Phaser.GameObjects.Image(
      scene,
      0,
      -256,
      "ribbon-w5-h1-yellow",
    ).setOrigin(0.5, 1);
    this.building = new Phaser.GameObjects.Image(
      scene,
      0,
      -96,
      "building-castle-construction",
    ).setOrigin(0.5, 1);

    // Create label
    this.label = new Phaser.GameObjects.Text(scene, 0, -276, "Constructions", {
      fontFamily: "Norse",
      fontSize: 32,
      color: "#ffffff",
      stroke: "#000000",
      strokeThickness: 8,
    }).setOrigin(0.5, 1);

    // Add sprites
    this.worker1 = scene.add.sprite(-96, -96, "pawn-yellow").setOrigin(0.5, 1);
    this.worker1.play("pawn-yellow-hit");

    this.worker2 = scene.add.sprite(96, -96, "pawn-yellow").setOrigin(0.5, 1);
    this.worker2.flipX = true;
    this.worker2.play("pawn-yellow-hit");

    // Interactions
    this.banner.setInteractive();
    this.banner.setScrollFactor(0, 0);
    this.banner.on("pointerdown", this.press, this);
    this.banner.on("pointerup", this.release, this);
    this.banner.on("pointerover", this.enter, this);
    this.banner.on("pointerout", this.leave, this);

    // Selector
    this.selector = new Selector(scene, 0, -160, 288, 160);

    // Depths
    this.banner.setDepth(0);
    this.carved.setDepth(1);
    this.ribbon.setDepth(2);
    this.label.setDepth(3);
    this.selector.setDepth(4);
    this.building.setDepth(5);
    this.worker1.setDepth(6);
    this.worker2.setDepth(6);

    // Add components to container
    this.add(this.banner);
    this.add(this.carved);
    this.add(this.building);
    this.add(this.ribbon);
    this.add(this.label);
    this.add(this.selector);
    this.add(this.worker1);
    this.add(this.worker2);
    this.sort("depth");

    // Default behavior
    this.worker1.anims.pause();
    this.worker2.anims.pause();
  }

  update() {
    this.selector.update();
  }

  press(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) {
    this.selector.press(pointer, gameObject);
    EventBus.emit("construction-visibility", this.scene);
    EventBus.emit("modal-open", this.scene);
  }

  release(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) {
    this.selector.release(pointer, gameObject);
  }

  enter(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) {
    this.worker1.anims.play("pawn-yellow-hit");
    this.worker2.anims.play("pawn-yellow-hit");
    this.selector.enter(pointer, gameObject);
  }

  leave(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) {
    this.worker1.anims.pause();
    this.worker2.anims.pause();
    this.selector.leave(pointer, gameObject);
  }
}
