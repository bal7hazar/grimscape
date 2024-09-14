import Sell from "../actions/sell";
import Command from "../elements/command";
import { EventBus } from "../EventBus";
import ShopManager from "../managers/sell";

export default class GoldShop extends Phaser.GameObjects.Container {
  protected hitbox: Phaser.GameObjects.Rectangle;
  protected banner: Phaser.GameObjects.Image;
  protected carved: Phaser.GameObjects.Image;
  protected leftCarved: Phaser.GameObjects.Image;
  protected rightCarved: Phaser.GameObjects.Image;
  protected ribbon: Phaser.GameObjects.Image;
  protected goldIcon: Phaser.GameObjects.Image;
  protected actionIcon: Phaser.GameObjects.Image;
  protected title: Phaser.GameObjects.Text;
  protected goldLabel: Phaser.GameObjects.Text;
  protected actionLabel: Phaser.GameObjects.Text;
  protected button: Sell;
  protected close: Command;
  protected after: Command;
  protected before: Command;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    // Geometries
    this.hitbox = new Phaser.GameObjects.Rectangle(
      scene,
      0,
      0,
      288,
      256,
      0x000000,
      0,
    );

    // Images
    this.banner = new Phaser.GameObjects.Image(scene, 0, 0, "banner-v-w7-h4");
    this.carved = new Phaser.GameObjects.Image(scene, 0, 32, "carved-w3-h1");
    this.leftCarved = new Phaser.GameObjects.Image(
      scene,
      -96,
      -32,
      "carved-w2-h1",
    );
    this.rightCarved = new Phaser.GameObjects.Image(
      scene,
      96,
      -32,
      "carved-w2-h1",
    );
    this.ribbon = new Phaser.GameObjects.Image(
      scene,
      0,
      -96,
      "ribbon-w4-h1-yellow",
    );
    this.goldIcon = new Phaser.GameObjects.Image(
      scene,
      -128,
      -32,
      "icon-gold",
    ).setDisplaySize(24, 24);
    this.actionIcon = new Phaser.GameObjects.Image(
      scene,
      128,
      -32,
      "icon-action",
    ).setDisplaySize(24, 24);

    // Commands
    this.close = new Command(
      scene,
      196,
      -32,
      "icon-close",
      "icon-close-pressed",
      { onRelease: () => this.handleClose() },
    );
    this.after = new Command(
      scene,
      196,
      32,
      "icon-right",
      "icon-right-pressed",
      { onRelease: () => this.handleAdd() },
    );
    this.before = new Command(
      scene,
      -196,
      32,
      "icon-left",
      "icon-left-pressed",
      { onRelease: () => this.handleSub() },
    );
    this.before.flipX();

    // Create labels
    const gold = ShopManager.getInstance().getGold();
    this.goldLabel = new Phaser.GameObjects.Text(scene, -80, -32, `${gold}`, {
      fontFamily: "Norse",
      fontSize: 38,
      color: "#ffffff",
      stroke: "#000000",
      strokeThickness: 6,
    }).setOrigin(0.5, 0.5);
    const action = ShopManager.getInstance().getAction();
    this.actionLabel = new Phaser.GameObjects.Text(
      scene,
      80,
      -32,
      `${action}`,
      {
        fontFamily: "Norse",
        fontSize: 38,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 6,
      },
    ).setOrigin(0.5, 0.5);
    this.title = new Phaser.GameObjects.Text(scene, 0, -104, "Gold Shop", {
      fontFamily: "Norse",
      fontSize: 32,
      color: "#ffffff",
      stroke: "#000000",
      strokeThickness: 8,
    }).setOrigin(0.5, 0.5);
    const label = new Phaser.GameObjects.Text(scene, 0, -32, "<", {
      fontFamily: "Norse",
      fontSize: 48,
      color: "#ffffff",
      stroke: "#000000",
      strokeThickness: 6,
    }).setOrigin(0.5, 0.5);

    // Button
    this.button = new Sell(scene, 0, 32);
    this.button.setScrollFactor(0);

    // Prevent click through
    this.hitbox.setInteractive().setScrollFactor(0);

    // Depths
    this.hitbox.setDepth(0);
    this.close.setDepth(1);
    this.after.setDepth(1);
    this.before.setDepth(1);
    this.banner.setDepth(2);
    this.carved.setDepth(3);
    this.leftCarved.setDepth(3);
    this.rightCarved.setDepth(3);
    this.ribbon.setDepth(3);
    this.button.setDepth(4);
    this.goldLabel.setDepth(4);
    this.actionLabel.setDepth(4);
    this.goldIcon.setDepth(4);
    this.actionIcon.setDepth(4);
    this.title.setDepth(4);
    label.setDepth(4);

    // Add components to container
    this.add(this.hitbox);
    this.add(this.banner);
    this.add(this.carved);
    this.add(this.leftCarved);
    this.add(this.rightCarved);
    this.add(this.ribbon);
    this.add(this.goldLabel);
    this.add(this.actionLabel);
    this.add(this.button);
    this.add(this.close);
    this.add(this.after);
    this.add(this.before);
    this.add(this.title);
    this.add(this.goldIcon);
    this.add(this.actionIcon);
    this.add(label);
    this.sort("depth");

    // Events
    EventBus.on(
      "gold-shop-visibility",
      () => this.setVisible(!this.visible),
      this.scene,
    );
    EventBus.on("gold-shop-close", () => this.setVisible(false), this.scene);
    EventBus.on("modal-close", () => this.setVisible(false), this.scene);

    // Default behavior
    this.setVisible(false);
  }

  update() {
    this.button?.update();

    if (!this.after.disabled && !ShopManager.getInstance().canIncrease()) {
      this.after.setEnable(false);
    } else if (this.after.disabled && ShopManager.getInstance().canIncrease()) {
      this.after.setEnable(true);
    }

    if (!this.before.disabled && !ShopManager.getInstance().canDecrease()) {
      this.before.setEnable(false);
    } else if (
      this.before.disabled &&
      ShopManager.getInstance().canDecrease()
    ) {
      this.before.setEnable(true);
    }

    if (ShopManager.getInstance().canPerform()) {
      this.goldLabel.setColor("#ffffff");
    } else {
      this.goldLabel.setColor("#ff9b9b");
    }
  }

  handleAdd() {
    ShopManager.getInstance().increase();
    this.goldLabel.setText(`${ShopManager.getInstance().getGold()}`);
    this.actionLabel.setText(`${ShopManager.getInstance().getAction()}`);
  }

  handleSub() {
    ShopManager.getInstance().decrease();
    this.goldLabel.setText(`${ShopManager.getInstance().getGold()}`);
    this.actionLabel.setText(`${ShopManager.getInstance().getAction()}`);
  }

  handleClose() {
    EventBus.emit("shop-pannel-close", this.scene);
    EventBus.emit("modal-close", this.scene);
  }
}
