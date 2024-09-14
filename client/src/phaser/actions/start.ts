import Button from "../elements/button";
import GameManager from "../managers/game";
import PlayerManager from "../managers/player";

export default class Start extends Button {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    const texture = "button-w3-h1-blue";
    const text = "Start";
    super(scene, x, y, texture, text);
  }

  update() {
    if (this.visible && !PlayerManager.getInstance().player) {
      this.setVisible(false);
    } else if (!this.visible && !!PlayerManager.getInstance().player) {
      this.setVisible(true);
    }
    super.update();
  }

  release(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) {
    if (!this.pressed) return;
    super.release(pointer, gameObject);
    if (this.disabled) return;
    GameManager.getInstance().callStart();
  }
}
