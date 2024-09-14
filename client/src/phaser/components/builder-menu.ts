import Selector from "../elements/selector";
import { EventBus } from "../EventBus";

export default class BuidlerMenu extends Phaser.GameObjects.Container {
  protected banner: Phaser.GameObjects.Image;
  protected carved: Phaser.GameObjects.Image;
  protected ribbon: Phaser.GameObjects.Image;
  protected label: Phaser.GameObjects.Text;
  protected selector: Selector;
  protected worker1: Phaser.GameObjects.Sprite;
  protected worker2: Phaser.GameObjects.Sprite;
  protected worker3: Phaser.GameObjects.Sprite;
  protected worker4: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    // Images
    this.banner = new Phaser.GameObjects.Image(
      scene,
      0,
      0,
      "banner-right-w4-h4",
    ).setOrigin(0.5, 1);
    this.carved = new Phaser.GameObjects.Image(
      scene,
      0,
      -64,
      "carved-w2-h2",
    ).setOrigin(0.5, 1);
    this.ribbon = new Phaser.GameObjects.Image(
      scene,
      32,
      0,
      "ribbon-w5-h1-yellow",
    ).setOrigin(0.5, 1);

    // Create label
    this.label = new Phaser.GameObjects.Text(scene, 0, -20, "Workers", {
      fontFamily: "Norse",
      fontSize: 32,
      color: "#ffffff",
      stroke: "#000000",
      strokeThickness: 8,
    }).setOrigin(0.5, 1);

    // Add sprites
    this.worker1 = scene.add.sprite(-32, -64, "pawn-blue").setOrigin(0.5, 1);
    this.worker1.flipX = true;
    this.worker1.play("pawn-blue-idle");

    this.worker2 = scene.add.sprite(-32, 0, "pawn-purple").setOrigin(0.5, 1);
    this.worker2.flipX = true;
    this.worker2.play("pawn-purple-cut");

    this.worker3 = scene.add.sprite(32, -64, "pawn-yellow").setOrigin(0.5, 1);
    this.worker3.play("pawn-yellow-hit");

    this.worker4 = scene.add.sprite(32, 0, "pawn-red").setOrigin(0.5, 1);
    this.worker4.play("pawn-red-move");

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
    this.banner.setDepth(1);
    this.carved.setDepth(2);
    this.ribbon.setDepth(3);
    this.label.setDepth(4);
    this.selector.setDepth(4);
    this.worker1.setDepth(5);
    this.worker2.setDepth(5);
    this.worker3.setDepth(5);
    this.worker4.setDepth(5);

    // Add components to container
    this.add(this.banner);
    this.add(this.carved);
    this.add(this.ribbon);
    this.add(this.label);
    this.add(this.selector);
    this.add(this.worker1);
    this.add(this.worker2);
    this.add(this.worker3);
    this.add(this.worker4);
    this.sort("depth");

    // Default behavior
    this.worker1.anims.pause();
    this.worker2.anims.pause();
    this.worker3.anims.pause();
    this.worker4.anims.pause();
  }

  update() {
    this.selector.update();
  }

  press(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) {
    this.selector.press(pointer, gameObject);
    EventBus.emit("builder-pannel-visibility", this.scene);
    EventBus.emit("modal-open", this.scene);
  }

  release(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) {
    this.selector.release(pointer, gameObject);
  }

  enter(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) {
    this.worker1.anims.play("pawn-blue-idle");
    this.worker2.anims.play("pawn-purple-cut");
    this.worker3.anims.play("pawn-yellow-hit");
    this.worker4.anims.play("pawn-red-move");
    this.selector.enter(pointer, gameObject);
  }

  leave(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) {
    this.worker1.anims.pause();
    this.worker2.anims.pause();
    this.worker3.anims.pause();
    this.worker4.anims.pause();
    this.selector.leave(pointer, gameObject);
  }
}
