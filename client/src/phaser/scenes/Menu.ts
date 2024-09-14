import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import Start from "../actions/start";
import Credits from "../actions/credits";
import Create from "../components/create";
import GameManager from "../managers/game";

export const BACKGROUND_HEIGHT = 816;
export const BACKGROUND_WIDTH = 2892;

export class Menu extends Scene {
  rexUI: any;
  title: Phaser.GameObjects.Text | null = null;
  label: Phaser.GameObjects.Text | null = null;
  pawnLeft: Phaser.GameObjects.Sprite | null = null;
  pawnRight: Phaser.GameObjects.Sprite | null = null;
  background: Phaser.GameObjects.TileSprite | null = null;
  signup: Create | null = null;
  start: Phaser.GameObjects.Container | null = null;
  credits: Phaser.GameObjects.Container | null = null;

  constructor() {
    super("Menu");
  }

  init() {}

  preload() {}

  create() {
    this.scale.on("resize", this.resize, this);
    EventBus.emit("current-scene-ready", this);
    this.changeScene();
  }

  update() {
  }

  resize(
    gameSize: { width: number; height: number },
    baseSize: number,
    displaySize: number,
    resolution: number,
  ) {
  }

  changeScene() {
    this.scene.start("Game");
  }
}
