import { Scene } from "phaser";

export class Boot extends Scene {
  constructor() {
    super("Boot");
  }

  preload() {}

  create() {
    this.input.setDefaultCursor("url(assets/pointers/pixel.png), pointer");
    this.scene.start("Preloader");
  }
}
