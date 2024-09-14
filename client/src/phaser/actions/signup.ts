import Button from "../elements/button";
import PlayerManager from "../managers/player";

export default class Signup extends Button {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    const texture = "button-w3-h1-blue";
    const text = "Sign up";
    super(scene, x, y, texture, text);
  }

  update() {
    if (!this.disabled && !!PlayerManager.getInstance().player) {
      this.setEnable(false);
    } else if (this.disabled && !PlayerManager.getInstance().player) {
      this.setEnable(true);
    }
    super.update();
  }

  release(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) {
    if (!this.pressed) return;
    super.release(pointer, gameObject);
    if (this.disabled) return;
    PlayerManager.getInstance().callSignup();
  }
}
