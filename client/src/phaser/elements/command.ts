export interface Options {
  onRelease?: Function;
  onPress?: Function;
  onEnter?: Function;
  onLeave?: Function;
  texture?: string;
  iconX?: number;
  iconY?: number;
}

export interface Callbacks {
  onRelease: Function;
  onPress: Function;
  onEnter: Function;
  onLeave: Function;
}

export default class Command extends Phaser.GameObjects.Container {
  public disabled: boolean = false;
  protected ribbon: Phaser.GameObjects.Image;
  protected icon: Phaser.GameObjects.Image;
  private iconIdle: string;
  private iconPressed: string;
  private callbacks: Callbacks;
  private texture: string;
  private iconX: number;
  private iconY: number;
  private pressed: boolean = false;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    iconIdle: string,
    iconPressed: string,
    options?: Options,
  ) {
    super(scene, x, y);
    this.iconIdle = iconIdle;
    this.iconPressed = iconPressed;

    // Parse optiopns
    this.texture = options?.texture || "ribbon-w1-yellow-left";
    this.iconX = options?.iconX || 0;
    this.iconY = options?.iconY || 16;
    this.callbacks = {
      onRelease: options?.onRelease || function () {},
      onPress: options?.onPress || function () {},
      onEnter: options?.onEnter || function () {},
      onLeave: options?.onLeave || function () {},
    };

    // Create button
    this.ribbon = new Phaser.GameObjects.Image(scene, 0, 0, this.texture);
    this.ribbon.setInteractive();
    this.ribbon.setScrollFactor(0);
    this.ribbon.on("pointerdown", this.press, this);
    this.ribbon.on("pointerup", this.release, this);
    this.ribbon.on("pointerover", this.enter, this);
    this.ribbon.on("pointerout", this.leave, this);

    // Create label
    this.icon = new Phaser.GameObjects.Image(
      scene,
      this.iconX,
      this.iconY,
      this.iconIdle,
    ).setOrigin(0.5, 0.75);

    // Depths
    this.ribbon.setDepth(1);
    this.icon.setDepth(2);

    // Add components to container
    this.add(this.ribbon);
    this.add(this.icon);
    this.sort("depth");
  }

  flipX() {
    this.ribbon.flipX = !this.ribbon.flipX;
    this.icon.flipX = !this.icon.flipX;
  }

  press(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) {
    if (this.disabled || this.pressed) return;
    this.callbacks.onPress();
    this.ribbon.setTexture(`${this.texture}-pressed`);
    this.icon.setTexture(this.iconPressed);
    this.icon.alpha = 1;
  }

  release(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) {
    if (this.disabled || this.pressed) return;
    this.callbacks.onRelease();
    this.ribbon.setTexture(this.texture);
    this.icon.setTexture(this.iconIdle);
    this.icon.alpha = 1;
  }

  enter(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) {
    if (this.disabled || this.pressed) return;
    this.callbacks.onEnter();
    this.icon.alpha = 0.75;
  }

  leave(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) {
    if (this.disabled || this.pressed) return;
    this.callbacks.onLeave();
    this.ribbon.setTexture(this.texture);
    this.icon.setTexture(this.iconIdle);
    this.icon.alpha = 1;
  }

  process(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) {
    if (this.disabled) return;
    this.icon.alpha = 0.5;
  }

  setEnable(status: boolean) {
    this.disabled = !status;
    this.icon.alpha = status ? 1 : 0.5;
  }

  setPressed(status: boolean) {
    this.pressed = status;
    this.ribbon.setTexture(status ? `${this.texture}-pressed` : this.texture);
    this.icon.setTexture(status ? this.iconPressed : this.iconIdle);
  }
}
