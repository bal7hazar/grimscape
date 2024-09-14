import Signup from "../actions/signup";
import PlayerManager from "../managers/player";

export default class Create extends Phaser.GameObjects.Container {
  protected ribbon: Phaser.GameObjects.Image;
  protected banner: Phaser.GameObjects.Image;
  protected carved: Phaser.GameObjects.Image;
  protected button: Phaser.GameObjects.Container;
  protected label: Phaser.GameObjects.Text;
  protected disabled: boolean = false;
  public username: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    // Create ribbon
    this.ribbon = new Phaser.GameObjects.Image(
      scene,
      0,
      0,
      "ribbon-w4-h1-blue",
    );
    this.banner = new Phaser.GameObjects.Image(scene, 0, 64, "banner-h-w6-h5");
    this.carved = new Phaser.GameObjects.Image(scene, 0, 64, "carved-w4-h1");
    this.button = new Signup(scene, 0, 140);

    // Create label
    const label = "Create a new player";
    this.label = new Phaser.GameObjects.Text(scene, 0, 0, label, {
      fontFamily: "Norse",
      fontSize: 24,
      color: "#ffffff",
      stroke: "#000000",
      strokeThickness: 4,
    }).setOrigin(0.5, 0.5);

    // Player name
    const username = PlayerManager.getInstance().username;
    this.username = new Phaser.GameObjects.Text(scene, 0, 64, username, {
      fontFamily: "Norse",
      fontSize: 36,
      color: "#ffffff",
      stroke: "#000000",
      strokeThickness: 4,
    }).setOrigin(0.5, 0.5);

    // Add components to container
    this.add(this.ribbon);
    this.add(this.banner);
    this.add(this.carved);
    this.add(this.username);
    this.add(this.button);
    this.add(this.label);
  }

  update() {
    PlayerManager.getInstance().setUsername(this.username.text);
    if (this.visible && !!PlayerManager.getInstance().player) {
      this.setVisible(false);
    } else if (!this.visible && !PlayerManager.getInstance().player) {
      this.setVisible(true);
    }
    this.button.update();
  }
}
