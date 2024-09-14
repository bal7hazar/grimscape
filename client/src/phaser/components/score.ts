import GameManager from "../managers/game";

export default class Score extends Phaser.GameObjects.Container {
  protected banner: Phaser.GameObjects.Image;
  protected carved: Phaser.GameObjects.Image;
  protected ribbon: Phaser.GameObjects.Image;
  protected label: Phaser.GameObjects.Text;
  protected title: Phaser.GameObjects.Text;
  protected icon: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    // Images
    this.banner = new Phaser.GameObjects.Image(
      scene,
      0,
      0,
      "banner-v-w4-h4",
    ).setOrigin(0.5, 0);
    this.carved = new Phaser.GameObjects.Image(
      scene,
      0,
      64,
      "carved-w2-h2",
    ).setOrigin(0.5, 0);
    this.ribbon = new Phaser.GameObjects.Image(
      scene,
      0,
      196,
      "ribbon-w4-h1-yellow",
    ).setOrigin(0.5, 0);
    this.icon = new Phaser.GameObjects.Image(
      scene,
      0,
      90,
      "icon-score",
    ).setDisplaySize(32, 32);

    // Labels
    this.label = new Phaser.GameObjects.Text(scene, 0, 108, "0", {
      fontFamily: "Norse",
      fontSize: 64,
      color: "#ffffff",
      stroke: "#000000",
      strokeThickness: 8,
    }).setOrigin(0.5, 0);
    this.title = new Phaser.GameObjects.Text(scene, 0, 198, "Score", {
      fontFamily: "Norse",
      fontSize: 36,
      color: "#ffffff",
      stroke: "#000000",
      strokeThickness: 8,
    }).setOrigin(0.5, 0);

    // Depths
    this.banner.setDepth(1);
    this.carved.setDepth(2);
    this.ribbon.setDepth(3);
    this.label.setDepth(4);
    this.title.setDepth(4);
    this.icon.setDepth(4);

    // Add components to container
    this.add(this.banner);
    this.add(this.carved);
    this.add(this.ribbon);
    this.add(this.label);
    this.add(this.title);
    this.add(this.icon);
    this.sort("depth");
  }

  update() {
    this.label.setText(`${GameManager.getInstance().game?.score || 0}`);
  }
}
