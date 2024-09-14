import Start from "../actions/start";
import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import GameManager from "../managers/game";

export class GameOver extends Scene {
  start: Phaser.GameObjects.Container | null = null;

  constructor() {
    super("GameOver");
  }

  create() {
    this.toMenu();
    EventBus.emit("current-scene-ready", this);
  }

  update() {
    if (!GameManager.getInstance().game) {
      this.toMenu();
    } else if (
      !!GameManager.getInstance().game &&
      !GameManager.getInstance()?.game?.isOver()
    ) {
      this.toGame();
    }
    this.start?.update();
  }

  toGame() {
    this.scene.start("Game");
  }

  toMenu() {
    this.scene.start("Menu");
  }
}
