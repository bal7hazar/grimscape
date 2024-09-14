import BuildingSelector from "../components/building-selector";
import GameManager from "../managers/game";

const MAX_ROW_COUNT = 7;

export default class BuildingSelectors extends Phaser.GameObjects.Container {
  protected banners: Phaser.GameObjects.Image[] = [];
  protected selectors: BuildingSelector[] = [];
  protected disabled: boolean = false;
  private cols: number = 0;
  private items: number = 0;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    this.setup();

    // // Images
    // this.banners = [
    //   new Phaser.GameObjects.Image(scene, -256, 0, "banner-h-left-w1-h16"),
    //   new Phaser.GameObjects.Image(scene, -128, 0, "banner-b-w2-h16"),
    //   new Phaser.GameObjects.Image(scene, 0, 0, "banner-b-w2-h16"),
    // ];
    // this.banners.forEach((banner) => banner.setOrigin(1, 0.5));

    // // Selector
    // const constructions = GameManager.getInstance().getConstructions();
    // this.selectors = constructions.map((id, index) => {
    //   const x = -196 + 128 *  Math.floor(index / 7);
    //   const y = -384 + (index % 7 * 128);
    //   return new BuildingSelector(scene, x, y, id);
    // });

    // // Depths
    // this.banners.forEach(banner => banner.setDepth(1));
    // this.selectors.forEach(selector => selector.setDepth(2));

    // // Prevent click through
    // this.banners.forEach(banner => banner.setInteractive().setScrollFactor(0));

    // // Add components to container
    // this.banners.forEach(banner => this.add(banner));
    // this.selectors.forEach(selector => this.add(selector.setScrollFactor(0)));
    // this.sort('depth');
  }

  setup() {
    // Selectors
    this.selectors.forEach((selector) => selector.destroy());
    const constructions = GameManager.getInstance().getConstructions();
    this.items = constructions.length;
    this.cols = Math.floor((constructions.length - 1) / MAX_ROW_COUNT) + 1;
    this.selectors = constructions.map((id, index) => {
      const x = 64 - 128 * (this.cols - Math.floor(index / MAX_ROW_COUNT));
      const y = -384 + (index % MAX_ROW_COUNT) * 128;
      const selector = new BuildingSelector(this.scene, x, y, id);
      selector.setDepth(2);
      selector.setScrollFactor(0);
      return selector;
    });

    // Banners
    this.banners.forEach((selector) => selector.destroy());
    this.banners = [];
    for (let i = 0; i < this.cols; i++) {
      const x = -128 * i;
      const banner = new Phaser.GameObjects.Image(
        this.scene,
        x,
        0,
        "banner-b-w2-h16",
      );
      banner.setOrigin(1, 0.5);
      banner.setDepth(1);
      banner.setInteractive().setScrollFactor(0);
      this.banners.push(banner);
    }
    const x = -128 * this.cols;
    const banner = new Phaser.GameObjects.Image(
      this.scene,
      x,
      0,
      "banner-h-left-w1-h16",
    );
    banner.setOrigin(1, 0.5);
    banner.setDepth(1);
    banner.setInteractive().setScrollFactor(0);
    this.banners.push(banner);

    // Add components to container
    this.banners.forEach((banner) => this.add(banner));
    this.selectors.forEach((selector) => this.add(selector));
    this.sort("depth");
  }

  update() {
    const constructions = GameManager.getInstance().getConstructions();
    const cols = Math.floor((constructions.length - 1) / MAX_ROW_COUNT) + 1;
    if (this.cols !== cols || this.items !== constructions.length) {
      this.setup();
    }
    this.setScale(0.8 ** this.cols);
    this.selectors.forEach((selector) => selector.update());
  }
}
