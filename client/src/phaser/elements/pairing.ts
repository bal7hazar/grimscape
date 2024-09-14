export default class Pairing extends Phaser.GameObjects.Container {
  protected topRibbon: Phaser.GameObjects.Image;
  protected bottomRibbon: Phaser.GameObjects.Image;
  protected icon: Phaser.GameObjects.Image;
  protected topLabel: Phaser.GameObjects.Text;
  protected bottomLabel: Phaser.GameObjects.Text;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    topText: string,
    bottomText: string,
    icon: string,
  ) {
    super(scene, x, y);

    // Create button
    this.topRibbon = new Phaser.GameObjects.Image(
      scene,
      0,
      -32,
      "ribbon-w1-blue-up-start",
    );
    this.bottomRibbon = new Phaser.GameObjects.Image(
      scene,
      0,
      32,
      "ribbon-w1-blue-down-start",
    );
    this.icon = new Phaser.GameObjects.Image(scene, 0, 0, icon);
    this.icon.setDisplaySize(24, 24);
    this.icon.setOrigin(0.5, 0.5);

    // Create labels
    this.topLabel = new Phaser.GameObjects.Text(scene, 0, -32, topText, {
      fontFamily: "Norse",
      fontSize: 24,
      color: "#ffffff",
      stroke: "#000000",
      strokeThickness: 4,
    }).setOrigin(0.5, 0.5);
    this.bottomLabel = new Phaser.GameObjects.Text(scene, 0, 32, bottomText, {
      fontFamily: "Norse",
      fontSize: 24,
      color: "#ffffff",
      stroke: "#000000",
      strokeThickness: 4,
    }).setOrigin(0.5, 0.5);

    // Depths
    this.topRibbon.setDepth(0);
    this.bottomRibbon.setDepth(0);
    this.icon.setDepth(1);
    this.topLabel.setDepth(1);
    this.bottomLabel.setDepth(1);

    // Add components to container
    this.add(this.topRibbon.setInteractive().setScrollFactor(0));
    this.add(this.bottomRibbon.setInteractive().setScrollFactor(0));
    this.add(this.icon.setInteractive().setScrollFactor(0));
    this.add(this.topLabel.setInteractive().setScrollFactor(0));
    this.add(this.bottomLabel.setInteractive().setScrollFactor(0));
  }

  update({ topText, bottomText }: { topText?: string; bottomText?: string }) {
    if (topText) {
      this.topLabel.setText(topText);
    }
    if (bottomText) {
      this.bottomLabel.setText(bottomText);
    }
  }
}
