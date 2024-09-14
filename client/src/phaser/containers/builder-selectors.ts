import BuilderSelector from "../components/builder-selector";
import GameManager from "../managers/game";

export default class BuilerSelectors extends Phaser.GameObjects.Container {
  protected banner: Phaser.GameObjects.Image | undefined = undefined;
  protected edge: Phaser.GameObjects.Image | undefined = undefined;
  protected selectors: BuilderSelector[] = [];
  protected disabled: boolean = false;
  private items: number = 0;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    this.setup();
  }

  setup() {
    // Selectors
    this.selectors.forEach((selector) => selector.destroy());
    const workers = GameManager.getInstance().getWorkers();
    this.items = workers.length;
    const x = 64;
    this.selectors = workers.map((id, index) => {
      const y = -384 + index * 128;
      const selector = new BuilderSelector(this.scene, x, y, id);
      selector.setDepth(2);
      selector.setScrollFactor(0);
      return selector;
    });

    // Banners

    this.banner = new Phaser.GameObjects.Image(
      this.scene,
      0,
      0,
      "banner-b-w3-h16",
    );
    this.banner.setOrigin(0, 0.5);
    this.banner.setDepth(1);
    this.banner.setInteractive().setScrollFactor(0);
    this.add(this.banner);

    this.edge = new Phaser.GameObjects.Image(
      this.scene,
      192,
      0,
      "banner-h-right-w1-h16",
    );
    this.edge.setOrigin(0, 0.5);
    this.edge.setDepth(1);
    this.edge.setInteractive().setScrollFactor(0);
    this.add(this.edge);

    // Add components to container
    this.selectors.forEach((selector) => this.add(selector));
    this.sort("depth");
  }

  update() {
    const workers = GameManager.getInstance().getWorkers();
    if (this.items !== workers.length) {
      this.setup();
    }
    this.selectors.forEach((selector) => selector.update());
  }
}
