import Selector from "../elements/selector";
import { EventBus } from "../EventBus";

export default class BuildingMenu extends Phaser.GameObjects.Container {
  protected banner: Phaser.GameObjects.Image;
  protected carved: Phaser.GameObjects.Image;
  protected ribbon: Phaser.GameObjects.Image;
  protected building: Phaser.GameObjects.Image;
  protected label: Phaser.GameObjects.Text;
  protected selector: Selector;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    // Images
    this.banner = new Phaser.GameObjects.Image(
      scene,
      0,
      0,
      "banner-left-w4-h4",
    ).setOrigin(0.5, 1);
    this.carved = new Phaser.GameObjects.Image(
      scene,
      0,
      -64,
      "carved-w2-h2",
    ).setOrigin(0.5, 1);
    this.ribbon = new Phaser.GameObjects.Image(
      scene,
      -32,
      0,
      "ribbon-w5-h1-yellow",
    ).setOrigin(0.5, 1);
    this.building = new Phaser.GameObjects.Image(
      scene,
      0,
      -64,
      "building-house-blue",
    ).setOrigin(0.5, 1);

    // Create label
    this.label = new Phaser.GameObjects.Text(scene, 0, -20, "Buildings", {
      fontFamily: "Norse",
      fontSize: 32,
      color: "#ffffff",
      stroke: "#000000",
      strokeThickness: 8,
    }).setOrigin(0.5, 1);

    // Interactions
    this.banner.setInteractive();
    this.banner.setScrollFactor(0, 0);
    this.banner.on("pointerdown", this.press, this);
    this.banner.on("pointerup", this.release, this);
    this.banner.on("pointerover", this.enter, this);
    this.banner.on("pointerout", this.leave, this);

    // Selector
    this.selector = new Selector(scene, 0, -128, 128, 128);

    // Depths
    this.banner.setDepth(0);
    this.carved.setDepth(1);
    this.ribbon.setDepth(2);
    this.selector.setDepth(3);
    this.label.setDepth(4);
    this.building.setDepth(5);

    // Add components to container
    this.add(this.banner);
    this.add(this.carved);
    this.add(this.building);
    this.add(this.ribbon);
    this.add(this.label);
    this.add(this.selector);
    this.sort("depth");
  }

  update() {
    this.selector.update();
  }

  press(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) {
    this.selector.press(pointer, gameObject);
    EventBus.emit("building-pannel-visibility", this.scene);
    EventBus.emit("modal-open", this.scene);
  }

  release(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) {
    this.selector.release(pointer, gameObject);
  }

  enter(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) {
    this.selector.enter(pointer, gameObject);
  }

  leave(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) {
    this.selector.leave(pointer, gameObject);
  }
}
