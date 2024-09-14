import Select from "../actions/select";
import BuildingPannel from "../components/building-pannel";
import { EventBus } from "../EventBus";

export class BuildingShop extends Phaser.GameObjects.Container {
  pannel: BuildingPannel;
  button: Select;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    // Builder Pannel
    this.pannel = new BuildingPannel(this.scene, 0, 0, this.handleClose);
    this.pannel.setScrollFactor(0);

    // Button
    this.button = new Select(scene, 0, 192);
    this.button.setScrollFactor(0);

    // Add components to container
    this.add(this.pannel);
    this.add(this.button);

    // Events
    EventBus.on(
      "building-pannel-visibility",
      () => this.setVisible(!this.visible),
      this.scene,
    );
    EventBus.on(
      "building-pannel-close",
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
    EventBus.emit("building-pannel-close", this.scene);
    EventBus.emit("modal-close", this.scene);
  }
}
