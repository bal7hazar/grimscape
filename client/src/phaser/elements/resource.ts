export default class Resource extends Phaser.GameObjects.Container {
  protected ribbon: Phaser.GameObjects.Image;
  protected icon: Phaser.GameObjects.Image;
  protected label: Phaser.GameObjects.Text;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    text: string,
    icon: string,
  ) {
    super(scene, x, y);

    // Create button
    this.ribbon = new Phaser.GameObjects.Image(scene, 0, 0, texture);
    this.icon = new Phaser.GameObjects.Image(scene, 64, -8, icon);
    this.icon.setDisplaySize(24, 24);
    this.icon.setOrigin(0.5, 0.5);

    // Create label
    this.label = new Phaser.GameObjects.Text(scene, 32, 0, text, {
      fontFamily: "Norse",
      fontSize: 24,
      color: "#ffffff",
      stroke: "#000000",
      strokeThickness: 4,
    }).setOrigin(0.5, 0.75);

    // Add components to container
    this.add(this.ribbon.setInteractive().setScrollFactor(0));
    this.add(this.icon.setInteractive().setScrollFactor(0));
    this.add(this.label.setInteractive().setScrollFactor(0));
  }

  update(text: string) {
    this.label.setText(text);
  }

  flipX() {
    this.ribbon.flipX = !this.ribbon.flipX;
    this.icon.setPosition(this.icon.x * -1, this.icon.y);
    this.label.setPosition(this.label.x * -1, this.label.y);
  }
}
