import Hire from "../actions/hire";
import BuilderPannel from "../components/builder-pannel";
import { EventBus } from "../EventBus";

export class BuilderShop extends Phaser.GameObjects.Container {
  pannel: BuilderPannel;
  button: Hire;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    // Builder Pannel
    this.pannel = new BuilderPannel(this.scene, 0, 0, this.handleClose);
    this.pannel.setScrollFactor(0);

    // Button
    this.button = new Hire(scene, 0, 192);
    this.button.setScrollFactor(0);

    // Add components to container
    this.add(this.pannel);
    this.add(this.button);

    // Events
    EventBus.on(
      "builder-pannel-visibility",
      () => this.setVisible(!this.visible),
      this.scene,
    );
    EventBus.on(
      "builder-pannel-close",
      () => this.setVisible(false),
      this.scene,
    );
    EventBus.on("modal-close", () => this.setVisible(false), this.scene);

    // Default behavior
    this.setVisible(false);
  }

  update() {
    this.pannel?.update();
    this.button?.update();
  }

  handleClose() {
    EventBus.emit("builder-pannel-close", this.scene);
    EventBus.emit("modal-close", this.scene);
  }
}
