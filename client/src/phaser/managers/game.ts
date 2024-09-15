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
  public room: Room | null = null;
  public mobs: Mob[] = [];
  public create: () => void = () => {};
  public move: (direction: number) => void = () => {};
  public interact: (direction: number) => void = () => {};
  public explore: (direction: number) => void = () => {};
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

  setMove(action: (direction: number) => void) {
    this.move = action;
  }

  setInteract(action: (direction: number) => void) {
    this.interact = action;
  }

  setExplore(action: (direction: number) => void) {
    this.explore = action;
  }

  callCreate() {
    if (!this.create) return;
    this.create();
  }

  callMove() {
    if (!this.move || !this.adventurer) return;
    this.move(this.getDirection());
  }

  callInteract() {
    if (!this.interact || !this.adventurer) return;
    this.interact(this.getDirection());
  }

  callExplore() {
    if (!this.explore || !this.adventurer) return;
    this.explore(this.getDirection());
  }
}

export default GameManager;
