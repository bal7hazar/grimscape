import { Realm } from "@/dojo/models/realm";
import { Dungeon } from "@/dojo/models/dungeon";
import { Adventurer } from "@/dojo/models/adventurer";
import { Room } from "@/dojo/models/room";
import { Mob } from "@/dojo/models/mob";

class GameManager {
  static instance: GameManager;
  public realm: Realm | null = null;
  public dungeon: Dungeon | null = null;
  public adventurer: Adventurer | null = null;
  public rooms: Room[] = [];
  public mobs: Mob[] = [];
  public create: () => void = () => {};
  public perform: (direction: number) => void = () => {};
  public direction: number = 0;

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

  setDirection(direction: number) {
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

  setMobs(mobs: Mob[]) {
    if (!mobs) return;
    this.mobs = mobs;
  }

  setCreate(action: () => void) {
    this.create = action;
  }

  setPerform(action: (direction: number) => void) {
    this.perform = action;
  }

  callCreate() {
    if (!this.create) return;
    this.create();
  }

  callPerform() {
    if (!this.perform || !this.adventurer) return;
    this.perform(this.getDirection());
  }
}

export default GameManager;
