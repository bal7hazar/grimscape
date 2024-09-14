export default class Button extends Phaser.GameObjects.Container {
  protected button: Phaser.GameObjects.Image;
  protected label: Phaser.GameObjects.Text;
  protected disabled: boolean = false;
  protected pressed: boolean = false;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    text: string,
  ) {
    super(scene, x, y);

    // Create button
    this.button = new Phaser.GameObjects.Image(scene, 0, 0, texture);
    this.button.setInteractive();
    this.button.setScrollFactor(0);
    this.button.on("pointerdown", this.press, this);
    this.button.on("pointerup", this.release, this);
    this.button.on("pointerover", this.enter, this);
    this.button.on("pointerout", this.leave, this);

    // Create label
    this.label = new Phaser.GameObjects.Text(scene, 0, 0, text, {
      fontFamily: "Norse",
      fontSize: 24,
      color: "#ffffff",
      stroke: "#000000",
      strokeThickness: 4,
    }).setOrigin(0.5, 0.75);

    // Add components to container
    this.add(this.button);
    this.add(this.label);
  }

  press(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) {
    if (this.disabled) return;
    this.pressed = true;
    this.button.setTexture("button-w3-h1-blue-pressed");
    this.label.setOrigin(0.5, 0.6);
    this.button.alpha = 1;
    this.label.alpha = 1;
  }

  release(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) {
    if (this.disabled) return;
    this.pressed = false;
    this.button.setTexture("button-w3-h1-blue");
    this.label.setOrigin(0.5, 0.75);
    this.button.alpha = 1;
    this.label.alpha = 1;
  }

  enter(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) {
    if (this.disabled) return;
    this.button.setTexture("button-w3-h1-hover");
    this.label.setOrigin(0.5, 0.75);
    this.button.alpha = 1;
    this.label.alpha = 1;
  }

  leave(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) {
    if (this.disabled) return;
    this.button.setTexture("button-w3-h1-blue");
    this.label.setOrigin(0.5, 0.75);
    this.button.alpha = 1;
    this.label.alpha = 1;
  }

  process(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) {
    if (this.disabled) return;
    this.button.alpha = 0.5;
    this.label.alpha = 0.5;
  }

  setEnable(status: boolean) {
    this.disabled = !status;
    this.alpha = status ? 1 : 0.5;
  }
}
