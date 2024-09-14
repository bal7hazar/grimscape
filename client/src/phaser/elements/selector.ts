export default class Selector extends Phaser.GameObjects.Container {
  protected northwest: Phaser.GameObjects.Image;
  protected northeast: Phaser.GameObjects.Image;
  protected southwest: Phaser.GameObjects.Image;
  protected southeast: Phaser.GameObjects.Image;
  private forced: boolean = false;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    originX?: number,
    originY?: number,
  ) {
    super(scene, x, y);

    // Create button
    this.northwest = new Phaser.GameObjects.Image(
      scene,
      -width / 2,
      -height / 2,
      "selector-nw",
    ).setScale(1.2);
    this.northeast = new Phaser.GameObjects.Image(
      scene,
      width / 2,
      -height / 2,
      "selector-ne",
    ).setScale(1.2);
    this.southwest = new Phaser.GameObjects.Image(
      scene,
      -width / 2,
      height / 2,
      "selector-sw",
    ).setScale(1.2);
    this.southeast = new Phaser.GameObjects.Image(
      scene,
      width / 2,
      height / 2,
      "selector-se",
    ).setScale(1.2);

    // Effects
    this.scene.tweens.add({
      targets: [this.northwest, this.northeast, this.southwest, this.southeast],
      scaleX: 1.5,
      scaleY: 1.5,
      duration: 300,
      yoyo: true,
      repeat: -1,
    });

    // Set origin
    if (originX !== undefined && originY !== undefined) {
      this.northwest.setOrigin(originX, originY);
      this.northeast.setOrigin(originX, originY);
      this.southwest.setOrigin(originX, originY);
      this.southeast.setOrigin(originX, originY);
    }

    // Add components to container
    this.add(this.northwest);
    this.add(this.northeast);
    this.add(this.southwest);
    this.add(this.southeast);

    // Set default visibility
    this.setEnable(false);
  }

  update() {}

  setForced(status: boolean) {
    this.setEnable(status);
    this.forced = status;
    this.setEnable(status);
  }

  setEnable(status: boolean) {
    if (this.forced) return;
    // Disable tweens
    if (!status || this.forced) {
      this.northwest.setVisible(false);
      this.northeast.setVisible(false);
      this.southwest.setVisible(false);
      this.southeast.setVisible(false);
    } else {
      this.northwest.setVisible(true);
      this.northeast.setVisible(true);
      this.southwest.setVisible(true);
      this.southeast.setVisible(true);
    }
  }

  press(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) {
    console.log("Press");
  }

  release(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) {
    console.log("Release");
  }

  enter(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) {
    this.setEnable(true);
  }

  leave(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) {
    this.setEnable(false);
  }
}
