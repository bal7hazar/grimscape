import Button from "../elements/button";
import GameManager from "../managers/game";
import PlayerManager from "../managers/player";
import BuyManager from "../managers/buy";

export default class Buy extends Button {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    const texture = "button-w3-h1-blue";
    const text = "Buy";
    super(scene, x, y, texture, text);
    this.setEnable(true);
    this.setVisible(true);
  }

  update() {
    if (
      this.visible &&
      (!PlayerManager.getInstance().player || !GameManager.getInstance().game)
    ) {
      this.setVisible(false);
    } else if (!this.disabled && !BuyManager.getInstance().canPerform()) {
      this.setEnable(false);
      this.setVisible(true);
    } else if (this.disabled && BuyManager.getInstance().canPerform()) {
      this.setEnable(true);
      this.setVisible(true);
    }
    super.update();
  }

  release(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) {
    if (!this.pressed) return;
    super.release(pointer, gameObject);
    if (this.disabled) return;
    GameManager.getInstance().callBuy();
  }
}
