import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import { Tilemap } from "../helpers/tilemap";
import GameManager from "../managers/game";
import { Room } from "@/dojo/models/room";
import Character from "../components/character";

export class Game extends Scene {
  map: Phaser.Tilemaps.Tilemap | null = null;
  tileset: Phaser.Tilemaps.Tileset | null = null;
  animatedTiles: any = undefined;
  rooms: string[] = [];
  player: Character | null = null;

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
    
    // Player
    const size = this.map!.tileWidth;
    const bounds = {
      minX: 0,
      minY: 0,
      maxX: this.map.widthInPixels - 2 * size,
      maxY: this.map.heightInPixels - 2 * size,
    };
    const character = new Character(
      this,
      0,
      0,
      0,
      size,
      bounds,
      true,
    );
    this.player = this.add.existing(character);
    this.player.setVisible(false);
    this.player.setDepth(1);

    // Listeners
    this.scale.on("resize", this.resize, this);

    // Events
    EventBus.emit("current-scene-ready", this);
  }

  update() {
    // Update map
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
    // Update player
    const adventurer = GameManager.getInstance().adventurer;
    if (!!adventurer) {
      this.player?.setVisible(true);
      this.player?.update(adventurer);
    }
  }

  generate(data: any, x: number, y: number) {
    data.layers.forEach((layer: any) => {
      const name = `${layer.name}-${x}-${y}`;
      const signX = x == 0 ? 0 : x / Math.abs(x);
      const signY = y == 0 ? 0 : y / Math.abs(y);
      const worldX = x * this.map!.width * this.map!.tileWidth + signX;
      const worldY = y * this.map!.height * this.map!.tileWidth + signY;
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
