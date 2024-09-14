import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import { Tilemap } from "../helpers/tilemap";

export class Game extends Scene {
  map: Phaser.Tilemaps.Tilemap | null = null;
  animatedTiles: any = undefined;

  constructor() {
    super("Game");
  }

  init() {}

  preload() {
    // Tilemap
    this.load.scenePlugin(
      "AnimatedTiles",
      "https://raw.githubusercontent.com/nkholski/phaser-animated-tiles/master/dist/AnimatedTiles.js",
      "animatedTiles",
      "animatedTiles",
    );
    this.load.image("tiles", "assets/tilemaps/tileset.png");
    this.load.tilemapTiledJSON("tilemap", Tilemap.generate(15, 15, 0x201BFB1A1C6DD43279CF5275AF5AE3669B5B1CC456B87BD864F0080n));
  }

  create() {
    // Tilemap
    this.map = this.make.tilemap({
      key: "tilemap",
      width: this.renderer.width,
      height: this.renderer.height,
    });
    const tileset = this.map.addTilesetImage("tileset", "tiles");
    this.map.createLayer("Ground", tileset!);
    this.map.createLayer("Details", tileset!);
    this.map.createLayer("Fog", tileset!);
    this.animatedTiles.init(this.map);

    // Camera
    this.cameras.main.scaleManager.scaleMode = Phaser.Scale.ScaleModes.RESIZE;
    this.cameras.main.setZoom(3);
    this.cameras.main.scrollX =
      -this.renderer.width / 2 + this.map.widthInPixels / 2;
    this.cameras.main.scrollY =
      -this.renderer.height / 2 + this.map.heightInPixels / 2;
    
    // Listeners
    this.scale.on("resize", this.resize, this);

    // Events
    EventBus.emit("current-scene-ready", this);
  }

  update(time: number, delta: number) {
    
  }

  resize(
    gameSize: { width: number; height: number },
    baseSize: number,
    displaySize: number,
    resolution: number,
  ) {
  }

  toGameOver() {
    this.scene.start("GameOver");
  }

  toMenu() {
    this.scene.start("Menu");
  }
}
