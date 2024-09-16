import { Realm } from "@/dojo/models/realm";
import { Dungeon } from "@/dojo/models/dungeon";
import { Adventurer } from "@/dojo/models/adventurer";
import { Room } from "@/dojo/models/room";
import { Mob } from "@/dojo/models/mob";
import { Direction, DirectionType } from "@/dojo/types/direction";

class GameManager {
  static instance: GameManager;
  public realm: Realm | null = null;
  public dungeon: Dungeon | null = null;
  public adventurer: Adventurer | null = null;
  public room: Room | null = null;
  public rooms: Room[] = [];
  public mobs: Mob[] = [];
  public create: () => void = () => {};
  public perform: (options : { direction: Direction }) => void = () => {};
  public direction: Direction = new Direction(DirectionType.None);

  constructor() {
    if (GameManager.instance) {
      return GameManager.instance;
    }
    GameManager.instance = this;
  }

  static getInstance() {
    if (!GameManager.instance) {
      GameManager.instance = new GameManager();
    }
    return GameManager.instance;
  }

  getDirection() {
    return this.direction;
  }

  setDirection(direction: Direction) {
    this.direction = direction;
  }

  setRealm(realm: Realm | null) {
    if (!realm) return;
    this.realm = realm;
  }

  setDungeon(dungeon: Dungeon | null) {
    if (!dungeon) return;
    this.dungeon = dungeon;
  }

  setAdventurer(adventurer: Adventurer | null) {
    if (!adventurer) return;
    this.adventurer = adventurer;
  }

  setRooms(rooms: Room[]) {
    if (!rooms) return;
    this.rooms = rooms;
  }

  setRoom(room: Room | null) {
    if (!room) return;
    this.room = room;
  }

  setMobs(mobs: Mob[]) {
    if (!mobs) return;
    this.mobs = mobs;
  }

  setCreate(action: () => void) {
    this.create = action;
  }

  setPerform(action: (options : { direction: Direction }) => void) {
    this.perform = action;
  }

  callCreate() {
    if (!this.create) return;
    this.create();
  }

  callPerform(options?: { move: boolean }) {
    if (!this.perform || !this.adventurer) return;
    this.perform({ direction: this.getDirection() });
  }
}

export default GameManager;
