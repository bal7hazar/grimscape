import BuidlerMenu from "../components/builder-menu";
import BuildingMenu from "../components/building-menu";
import ConstructionMenu from "../components/construction-menu";

export default class Footer extends Phaser.GameObjects.Container {
  construction: ConstructionMenu;
  building: BuildingMenu;
  builder: BuidlerMenu;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    this.construction = new ConstructionMenu(scene, 0, 0);
    this.construction.setScrollFactor(0, 0);

    this.builder = new BuidlerMenu(scene, -288, -32);
    this.builder.setScrollFactor(0, 0);

    this.building = new BuildingMenu(scene, 288, -32);
    this.building.setScrollFactor(0, 0);

    // Add components to container
    this.add(this.builder);
    this.add(this.building);
    this.add(this.construction);
  }

  update() {
    this.builder.update();
    this.building.update();
  }
}
