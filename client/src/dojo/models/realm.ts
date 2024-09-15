import { ComponentValue } from "@dojoengine/recs";

export class Realm {
  public id: string;
  public dungeon_count: number;

  constructor(realm: ComponentValue) {
    this.id = realm.id;
    this.dungeon_count = realm.dungeon_count;
  }
}
