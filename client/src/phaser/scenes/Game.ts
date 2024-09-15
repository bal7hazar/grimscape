import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import { Tilemap } from "../helpers/tilemap";
import GameManager from "../managers/game";
import { Room } from "@/dojo/models/room";

export class Game extends Scene {
  map: Phaser.Tilemaps.Tilemap | null = null;
  tileset: Phaser.Tilemaps.Tileset | null = null;
  animatedTiles: any = undefined;
  rooms: string[] = [];

  constructor() {
    super("Game");
  }

  init() {}

  preload() {
    // Camera
    this.cameras.main.scaleManager.scaleMode = Phaser.Scale.ScaleModes.RESIZE;
    // Tilemap
    this.load.scenePlugin(
      "AnimatedTiles",
      "https://raw.githubusercontent.com/nkholski/phaser-animated-tiles/master/dist/AnimatedTiles.js",
      "animatedTiles",
      "animatedTiles",
    );
    this.load.image("tiles", "assets/tilemaps/tileset.png");
    this.load.tilemapTiledJSON("tilemap", "assets/tilemaps/tilemap.json");
  }

  create() {
    // Tilemap
    this.map = this.make.tilemap({
      key: "tilemap",
      width: this.renderer.width,
      height: this.renderer.height,
    });
    this.tileset = this.map.addTilesetImage("tileset", "tiles");

    // Listeners
    this.scale.on("resize", this.resize, this);

    // Events
    EventBus.emit("current-scene-ready", this);
  }

  update() {
    const rooms = GameManager.getInstance().rooms;
    if (!!rooms && this.rooms.length !== rooms.length) {
      rooms.forEach((room: Room) => {
        // Check if room is already created
        const key = `${room.x}-${room.y}`;
        if (this.rooms.includes(key)) return;
        // Create room
        const tilemap = Tilemap.generate(room.width, room.height, room.grid);
        this.generate(tilemap, room.x, room.y);
        // Update camera
        this.cameras.main.scrollX = -this.renderer.width / 2 + this.map!.widthInPixels / 2;
        this.cameras.main.scrollY = -this.renderer.height / 2 + this.map!.heightInPixels / 2;
        this.cameras.main.setZoom(3);
        // Store room
        this.rooms.push(key);
      });
    }
  }

  generate(data: any, x: number, y: number) {
    data.layers.forEach((layer: any) => {
      const name = `${layer.name}-${x}-${y}`;
      const worldX = x * this.map!.width * this.map!.tileWidth;
      const worldY = y * this.map!.height * this.map!.tileWidth;
      const newLayer = this.map!.createBlankLayer(name, this.tileset!, worldX, worldY);
      layer.data.forEach((tile: any, index: number) => {
        if (!tile) return;
        const x = index % data.width;
        const y = Math.floor(index / data.width);
        newLayer!.putTileAt(tile, x, y);
      });
    });
    this.animatedTiles.init(this.map!);
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
