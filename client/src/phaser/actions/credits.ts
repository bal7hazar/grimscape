import Button from "../elements/button";
import PlayerManager from "../managers/player";

export default class Credits extends Button {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "button-w3-h1-blue", "Credits");
  }

  update() {
    if (this.visible && !PlayerManager.getInstance().player) {
      this.setVisible(false);
    } else if (!this.visible && !!PlayerManager.getInstance().player) {
      this.setVisible(true);
    }
    super.update();
  }
}
