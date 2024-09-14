import Command from "../elements/command";
import { EventBus } from "../EventBus";
import GameManager from "../managers/game";

export default class Gold extends Phaser.GameObjects.Container {
  protected banner: Phaser.GameObjects.Image;
  protected carved: Phaser.GameObjects.Image;
  protected ribbon: Phaser.GameObjects.Image;
  protected label: Phaser.GameObjects.Text;
  protected title: Phaser.GameObjects.Text;
  protected icon: Phaser.GameObjects.Image;
  protected command: Command;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    // Images
    this.banner = new Phaser.GameObjects.Image(
      scene,
      0,
      0,
      "banner-right-w3-h4",
    ).setOrigin(0.5, 0);
    this.carved = new Phaser.GameObjects.Image(
      scene,
      0,
      128,
      "carved-w1-h1",
    ).setOrigin(0.5, 0);
    this.ribbon = new Phaser.GameObjects.Image(
      scene,
      32,
      64,
      "ribbon-w4-h1-yellow",
    ).setOrigin(0.5, 0);
    this.icon = new Phaser.GameObjects.Image(scene, 58, 76, "icon-gold")
      .setOrigin(0.5, 0)
      .setDisplaySize(24, 24);

    // Commands
    this.command = new Command(
      scene,
      -70,
      160,
      "icon-right",
      "icon-right-pressed",
      { onRelease: this.handleOpen },
    );
    this.command.flipX();

    // Create label
    this.label = new Phaser.GameObjects.Text(scene, 0, 132, "0", {
      fontFamily: "Norse",
      fontSize: 48,
      color: "#ffffff",
      stroke: "#000000",
      strokeThickness: 6,
    }).setOrigin(0.5, 0);
    this.title = new Phaser.GameObjects.Text(scene, 0, 66, "Gold", {
      fontFamily: "Norse",
      fontSize: 36,
      color: "#ffffff",
      stroke: "#000000",
      strokeThickness: 8,
    }).setOrigin(0.5, 0);

    // Depths
    this.command.setDepth(0);
    this.banner.setDepth(1);
    this.carved.setDepth(2);
    this.ribbon.setDepth(3);
    this.label.setDepth(4);
    this.title.setDepth(5);
    this.icon.setDepth(6);

    // Add components to container
    this.add(this.command);
    this.add(this.banner);
    this.add(this.carved);
    this.add(this.ribbon);
    this.add(this.label);
    this.add(this.title);
    this.add(this.icon);
    this.sort("depth");
  }

  update() {
    this.label.setText(`${GameManager.getInstance().game?.gold || 0}`);
  }

  handleOpen() {
    EventBus.emit("gold-shop-visibility", this.scene);
    EventBus.emit("modal-open", this.scene);
  }
}
