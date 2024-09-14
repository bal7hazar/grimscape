import Send from "../actions/send";
import ConstructionPannel from "../components/construction-pannel";
import { EventBus } from "../EventBus";
import BuildingSelectors from "./building-selectors";
import BuilderSelectors from "./builder-selectors";

export class Construction extends Phaser.GameObjects.Container {
  pannel: ConstructionPannel;
  buildings: BuildingSelectors;
  builders: BuilderSelectors;
  button: Send;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number,
  ) {
    super(scene, x, y);

    // Construction Pannel
    this.pannel = new ConstructionPannel(this.scene, 0, 0, this.handleClose);
    this.pannel.setScrollFactor(0);

    // Building Selector
    this.buildings = new BuildingSelectors(this.scene, 0, 0);
    this.builders = new BuilderSelectors(this.scene, 0, 0).setScale(0.8);
    this.buildings.setPosition(width / 2, 0);
    this.builders.setPosition(-width / 2, 0);

    // Button
    this.button = new Send(scene, 64, 196);
    this.button.setScrollFactor(0);

    // Add components to container
    this.add(this.pannel);
    this.add(this.buildings);
    this.add(this.builders);
    this.add(this.button);

    // Events
    EventBus.on(
      "construction-visibility",
      () => this.setVisible(!this.visible),
      this.scene,
    );
    EventBus.on("construction-close", () => this.setVisible(false), this.scene);
    EventBus.on("modal-close", () => this.setVisible(false), this.scene);

    // Default behavior
    this.setVisible(false);
    this.scene.scale.on("resize", this.resize, this);
  }

  update() {
    this.pannel?.update();
    this.button?.update();
    this.buildings?.update();
    this.builders?.update();
  }

  resize(
    gameSize: { width: number; height: number },
    baseSize: number,
    displaySize: number,
    resolution: number,
  ) {
    const width = gameSize.width;
    this.buildings.setScale(1);
    this.builders.setScale(1);
    this.buildings.setPosition(width / 2, 0);
    this.builders.setPosition(-width / 2, 0);
    this.buildings.setScale(0.8);
    this.builders.setScale(0.8);
  }

  handleClose() {
    EventBus.emit("construction-close", this.scene);
    EventBus.emit("modal-close", this.scene);
  }
}
