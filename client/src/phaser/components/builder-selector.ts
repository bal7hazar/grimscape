import Selector from "../elements/selector";
import GameManager from "../managers/game";
import Details from "./details";

export default class BuilderSelector extends Phaser.GameObjects.Container {
  protected carved: Phaser.GameObjects.Image;
  protected selector: Selector;
  protected builder: Phaser.GameObjects.Sprite;
  protected details: Details;
  private key: string;
  private id: number;
  private selected: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number, id: number) {
    super(scene, x, y);
    this.id = id;

    // Images
    this.carved = new Phaser.GameObjects.Image(scene, 32, 0, "carved-w3-h2");
    this.key = GameManager.getInstance().isIdle(id) ? `idle` : `hit`;
    const image = GameManager.getInstance().getBuilder(id).getImage();
    this.builder = scene.add.sprite(0, -32, image);
    this.builder.setScale(1.5);
    this.builder.play(`${image}-${this.key}`);

    // Selector
    this.selector = new Selector(scene, 32, 0, 160, 96);
    this.carved.setInteractive().setScrollFactor(0);
    this.carved.on("pointerdown", this.press, this);
    this.carved.on("pointerup", this.release, this);
    this.carved.on("pointerover", this.enter, this);
    this.carved.on("pointerout", this.leave, this);

    // Resource details
    this.details = new Details(scene, 64, 8);

    // Depths
    this.carved.setDepth(0);
    this.selector.setDepth(1);
    this.builder.setDepth(2);
    this.details.setDepth(3);

    // Add components to container
    this.add(this.carved);
    this.add(this.selector.setScrollFactor(0));
    this.add(this.builder.setScrollFactor(0));
    this.add(this.details.setScrollFactor(0));
    this.sort("depth");
  }

  update() {
    const builderId = GameManager.getInstance().getSelectedBuilderId();
    if (!this.selected && this.id === builderId) {
      this.selector.setForced(true);
      this.selected = true;
    } else if (this.selected && this.id !== builderId) {
      this.selector.setForced(false);
      this.selected = false;
    }
    const key = GameManager.getInstance().isIdle(this.id) ? `idle` : `hit`;
    if (this.key !== key) {
      this.key = key;
      const image = GameManager.getInstance().getBuilder(this.id).getImage();
      this.builder.play(`${image}-${this.key}`);
    }
    this.selector.update();
  }

  press(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) {
    GameManager.getInstance().setSelectedBuilder(this.id);
    this.selector.press(pointer, gameObject);
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
