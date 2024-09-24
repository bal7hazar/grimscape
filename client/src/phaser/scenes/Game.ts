import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import { Tilemap } from "../helpers/tilemap";
import GameManager from "../managers/game";
import { Room } from "@/dojo/models/room";
import Character from "../components/character";
import Foe from "../components/foe";
import Explore from "../components/explore";
import { Direction, DirectionType } from "@/dojo/types/direction";
import { ROOM_HEIGHT, ROOM_WIDTH } from "@/dojo/constants";

// Constants

const CAMERA_SPEED: number = 0.01;
const CAMERAS_EPSILON: number = 0.1;

export class Game extends Scene {
  map: Phaser.Tilemaps.Tilemap | null = null;
  tileset: Phaser.Tilemaps.Tileset | null = null;
  animatedTiles: any = undefined;
  rooms: string[] = [];
  room: string = "";
  explores: Explore[]= [];
  player: Character | null = null;
  foes: { [key: string]: Foe } = {};
  private request: number = 0;
  private path: Phaser.GameObjects.Image[] = [];
  private positions: { x: number, y: number }[] = [];
  private target: { fromX: number; fromY: number; toX: number; toY: number } | null = null;

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
    this.load.image("path", "assets/tilemaps/path.png");
    this.load.image("arrow-up", "assets/tilemaps/arrow-up.png");
    this.load.image("arrow-down", "assets/tilemaps/arrow-down.png");
    this.load.image("arrow-left", "assets/tilemaps/arrow-left.png");
    this.load.image("arrow-right", "assets/tilemaps/arrow-right.png");
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
    const step = this.map!.tileWidth;
    const character = new Character(
      this,
      0,
      0,
      step,
      true,
    );
    this.player = this.add.existing(character);
    this.player.setVisible(false);
    this.player.setDepth(2);

    // Pathfinding
    this.input.on(Phaser.Input.Events.POINTER_DOWN, this.onPress, this);
    this.input.on(Phaser.Input.Events.POINTER_UP, this.onRelease, this);

    // Cameras
    this.cameras.main.setZoom(2.5);
    EventBus.on("center-camera", this.center, this);
    this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
      if (!pointer.isDown) return;
      this.target = null;
      this.cameras.main.scrollX -= (pointer.x - pointer.prevPosition.x) / this.cameras.main.zoom;
      this.cameras.main.scrollY -= (pointer.y - pointer.prevPosition.y) / this.cameras.main.zoom;
    });
    this.input.on("wheel", (_pointer: Phaser.Input.Pointer, _gameObjects: any, _deltaX: number, deltaY: number, _deltaZ: number) => {
      const sign = deltaY == 0 ? 0 : deltaY / Math.abs(deltaY);
      const zoom = this.cameras.main.zoom - 0.1 * sign;
      this.cameras.main.zoom = zoom > 1 && zoom < 3 ? zoom : this.cameras.main.zoom;
    });

    // Events
    EventBus.emit("current-scene-ready", this);
  }

  update() {
    // Update rooms
    const rooms = GameManager.getInstance().rooms;
    if (!!rooms && this.rooms.length !== rooms.length) {
      rooms.forEach((room: Room) => {
        // Check if room is already created
        const key = `${room.x}-${room.y}`;
        if (this.rooms.includes(key)) return;
        // Create room
        const tilemap = Tilemap.generate(room.width, room.height, room.grid);
        this.generate(tilemap, room.x, -room.y);
        // Store room
        this.rooms.push(key);
      });
      
      // Update player layers
      this.player!.setCollision(this.map!.layers.map((layer) => layer.tilemapLayer));
      // Reset camera
      EventBus.emit("center-camera");
    }

    // Update explore arrows
    const room = GameManager.getInstance().room;
    const key = `${room?.x}-${room?.y}`;
    if (!!room && key != this.room) {
      this.explores.forEach((explore) => {
        explore.image.destroy();
        explore.destroy();
    });
      this.explores = [];
      this.room = key;
      const neighbors = [{ x: room.x - 1, y: room.y }, { x: room.x + 1, y: room.y }, { x: room.x, y: room.y - 1 }, { x: room.x, y: room.y + 1 }];
      neighbors.forEach(({ x, y }: { x: number, y: number }) => {
        const dx = x - room.x;
        const dy = room.y - y;
        const signX = dx == 0 ? 0 : dx / Math.abs(dx);
        const signY = dy == 0 ? 0 : dy / Math.abs(dy);
        const worldX = room.x * this.map!.width * this.map!.tileWidth + this.map!.widthInPixels / 2 + signX * ROOM_WIDTH / 2 * this.map!.tileWidth + signX * this.map!.tileWidth / 2;
        const worldY = -room.y * this.map!.height * this.map!.tileWidth + this.map!.heightInPixels / 2 + signY * ROOM_HEIGHT / 2 * this.map!.tileWidth + signY * this.map!.tileWidth / 2;
        const direction = dx === 0 ? (dy === 1 ? DirectionType.South : DirectionType.North) : (dx === 1 ? DirectionType.East : DirectionType.West);
        const explore = new Explore(this, worldX, worldY, direction);
        this.explores.push(explore);
        this.add.existing(explore);
      });
    }
    
    // Update explores
    if (!!this.explores && !!this.player) {
      this.explores.forEach((explore) => explore.update(this.player!));
    }

    // Update player with state
    const adventurer = GameManager.getInstance().adventurer;
    if (!!adventurer) {
      this.player?.setVisible(true);
      this.player?.update(adventurer);
    }
    // Update player with events
    const adventurerUpdates = GameManager.getInstance().adventurerUpdates;
    if (!!adventurerUpdates) {
      adventurerUpdates.forEach((update) => {
        this.player?.addTarget(update.order, update.adventurer);
        GameManager.getInstance().adventurerUpdates.shift();
      });
    }

    const mobs = GameManager.getInstance().mobs;
    if (!!mobs) {
      // Update foes with state
      mobs.forEach((mob) => {
        const key = `${mob.realm_id}-${mob.dungeon_id}-${mob.adventurer_id}-${mob.x}-${mob.y}-${mob.id}`;
        if (!this.foes[key]) {
          const foe = new Foe(this, 0, 0, this.map!.tileWidth, key);
          this.foes[key] = foe;
          foe.setDepth(1);
          this.add.existing(foe);
        }
        this.foes[key].update(mob);
      });
      // Update foes with events
      const mobUpdates = GameManager.getInstance().mobUpdates;
      if (!!mobUpdates) {
        mobUpdates.forEach((update) => {
          const key = `${update.mob.realm_id}-${update.mob.dungeon_id}-${update.mob.adventurer_id}-${update.mob.x}-${update.mob.y}-${update.mob.id}`;
          if (!this.foes[key]) return;
          this.foes[key].addTarget(update.order, update.mob);
          GameManager.getInstance().mobUpdates.shift();
        });
      }
    };

    // Update Camera
    if (!!this.target && Math.abs(this.cameras.main.scrollX - this.target.toX) < CAMERAS_EPSILON && Math.abs(this.cameras.main.scrollY - this.target.toY) < CAMERAS_EPSILON) {
      // Camera is close to the target, then fix it
      this.cameras.main.scrollX = this.target.toX;
      this.cameras.main.scrollY = this.target.toY;  
      this.target = null;
    } else if (!!this.target) {
      // Move camera to target
      const dx = this.target.toX - this.target.fromX;
      const dy = this.target.toY - this.target.fromY;
      this.cameras.main.scrollX += dx * CAMERA_SPEED;
      this.cameras.main.scrollY += dy * CAMERA_SPEED;
    }

  }

  center() {
    const adventurer = GameManager.getInstance().adventurer;
    if (!adventurer || !this.cameras.main) return;
    const x = adventurer.x;
    const y = -adventurer.y;
    const signX = x == 0 ? 0 : x / Math.abs(x);
    const signY = y == 0 ? 0 : y / Math.abs(y);
    const worldX = x * this.map!.width * this.map!.tileWidth + signX;
    const worldY = y * this.map!.height * this.map!.tileWidth + signY;
    const cameraX = -this.renderer.width / 2 + this.map!.widthInPixels / 2 + worldX;
    const cameraY = -this.renderer.height / 2 + this.map!.heightInPixels / 2 + worldY;
    if (this.cameras.main.scrollX === cameraX && this.cameras.main.scrollY === cameraY) return;
    this.target = { fromX: this.cameras.main.scrollX, fromY: this.cameras.main.scrollY, toX: cameraX, toY: cameraY };
  }

  generate(data: any, x: number, y: number) {
    const signX = x == 0 ? 0 : x / Math.abs(x);
    const signY = y == 0 ? 0 : y / Math.abs(y);
    const worldX = x * this.map!.width * this.map!.tileWidth + signX;
    const worldY = y * this.map!.height * this.map!.tileWidth + signY;
    data.layers.forEach((layer: any) => {
      const name = `${layer.name}-${x}-${y}`;
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

  toGameOver() {
    this.scene.start("GameOver");
  }

  toMenu() {
    this.scene.start("Menu");
  }

  onPress(pointer: Phaser.Input.Pointer) {
    // Check if there is a path result stored and if the player has cliked on the last position
    if (this.path.length > 0 && this.positions.length > 0) {
      // Get pointer coordinates
      const { worldX, worldY } = pointer;
      const current = this.map!.worldToTileXY(worldX, worldY);
      const last = this.positions[this.positions.length - 1];
      if (!!current && current.x === last.x && current.y === last.y) {
        const directions: Direction[] = Direction.extract(this.positions);
        this.path.forEach((rectangle) => rectangle.destroy());
        this.path = [];
        this.positions = [];
        GameManager.getInstance().multiperform({ directions });
        return;
      }
    }
    // Prepare the pathfinding request and reset the previous path result
    this.request = pointer.x + pointer.y;
  }

  onRelease(pointer: Phaser.Input.Pointer) {
    // Check if a pathfinding request at this position was made
    if (this.request != pointer.x + pointer.y) return;
    this.request = 0;
    this.path.forEach((rectangle) => rectangle.destroy());
    // Get pointer coordinates
    const { worldX, worldY } = pointer;
    const from = this.map!.worldToTileXY(this.player!.sprite.x, this.player!.sprite.y);
    const to = this.map!.worldToTileXY(worldX, worldY);
    // Search path
    const room = GameManager.getInstance().room;
    if (!room || !from || !to) return;
    this.positions = room.search(from, to);
    // Apply a tint modifier for each tile position in the path
    this.path = this.positions.map((position: { x: number, y: number }) => {
      const world = this.map!.tileToWorldXY(position.x, position.y);
      const image = new Phaser.GameObjects.Image(this, world!.x + 8, world!.y + 8, "path");
      this.add.existing(image);
      return image;
    });
  }
}
