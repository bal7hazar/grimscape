import { Kloster } from "../elements/buildings/kloster";
import { Gard } from "../elements/buildings/gard";
import { Vaktarn } from "../elements/buildings/vaktarn";
import { Pergola } from "../elements/buildings/pergola";
import { Vertshus } from "../elements/buildings/vertshus";
import { Kornlager } from "../elements/buildings/kornlager";
import { Landgard } from "../elements/buildings/landgard";
import { Postgard } from "../elements/buildings/postgard";
import { Svinehus } from "../elements/buildings/svinehus";
import { Steinbru } from "../elements/buildings/steinbru";
import { Taketbru } from "../elements/buildings/taketbru";
import { Vannmolle } from "../elements/buildings/vannmolle";
import { Vindmolle } from "../elements/buildings/vindmolle";
import { Litenhus } from "../elements/buildings/litenhus";
import { Byhus } from "../elements/buildings/byhus";
import { Landhus } from "../elements/buildings/landhus";
import { Borgerskapshus } from "../elements/buildings/borgerskapshus";
import { Vaskeri } from "../elements/buildings/vaskeri";
import { Strahytte } from "../elements/buildings/strahytte";
import { Hotell } from "../elements/buildings/hotell";
import { Markedshall } from "../elements/buildings/markedshall";
import { Smie } from "../elements/buildings/smie";
import { Fjos } from "../elements/buildings/fjos";
import { Kirke } from "../elements/buildings/kirke";
import { Stall } from "../elements/buildings/stall";
import { Strahus } from "../elements/buildings/strahus";
import { Hof } from "../elements/buildings/hof";
import { Offerkapell } from "../elements/buildings/offerkapell";
import { Hytte } from "../elements/buildings/hytte";
import { Festning } from "../elements/buildings/festning";
import { Trehytte } from "../elements/buildings/trehytte";
import { Gjestgiveri } from "../elements/buildings/gjestgiveri";
import { Vatnsvei } from "../elements/buildings/vatnsvei";
import { Gydingar } from "../elements/buildings/gydingar";

import { Resource } from "./resource";

export enum BuildingType {
  None = "None",
  Kloster = "Kloster",
  Gard = "Gard",
  Vaktarn = "Vaktarn",
  Pergola = "Pergola",
  Vertshus = "Vertshus",
  Kornlager = "Kornlager",
  Landgard = "Landgard",
  Postgard = "Postgard",
  Svinehus = "Svinehus",
  Steinbru = "Steinbru",
  Taketbru = "Taketbru",
  Vannmolle = "Vannmolle",
  Vindmolle = "Vindmolle",
  Litenhus = "Litenhus",
  Byhus = "Byhus",
  Landhus = "Landhus",
  Borgerskapshus = "Borgerskapshus",
  Vaskeri = "Vaskeri",
  Strahytte = "Strahytte",
  Hotell = "Hotell",
  Markedshall = "Markedshall",
  Smie = "Smie",
  Fjos = "Fjos",
  Kirke = "Kirke",
  Stall = "Stall",
  Strahus = "Strahus",
  Hof = "Hof",
  Offerkapell = "Offerkapell",
  Hytte = "Hytte",
  Festning = "Festning",
  Trehytte = "Trehytte",
  Gjestgiveri = "Gjestgiveri",
  Vatnsvei = "Vatnsvei",
  Gydingar = "Gydingar",
}

export class Building {
  value: BuildingType;

  constructor(value: BuildingType) {
    this.value = value;
  }

  public into(): number {
    return Object.values(BuildingType).indexOf(this.value);
  }

  public static from(index: number): Building {
    const item = Object.values(BuildingType)[index];
    return new Building(item);
  }

  public static getBuildings(): Building[] {
    return [
      new Building(BuildingType.Kloster),
      new Building(BuildingType.Gard),
      new Building(BuildingType.Vaktarn),
      new Building(BuildingType.Pergola),
      new Building(BuildingType.Vertshus),
      new Building(BuildingType.Kornlager),
      new Building(BuildingType.Landgard),
      new Building(BuildingType.Postgard),
      new Building(BuildingType.Svinehus),
      new Building(BuildingType.Steinbru),
      new Building(BuildingType.Taketbru),
      new Building(BuildingType.Vannmolle),
      new Building(BuildingType.Vindmolle),
      new Building(BuildingType.Litenhus),
      new Building(BuildingType.Byhus),
      new Building(BuildingType.Landhus),
      new Building(BuildingType.Borgerskapshus),
      new Building(BuildingType.Vaskeri),
      new Building(BuildingType.Strahytte),
      new Building(BuildingType.Hotell),
      new Building(BuildingType.Markedshall),
      new Building(BuildingType.Smie),
      new Building(BuildingType.Fjos),
      new Building(BuildingType.Kirke),
      new Building(BuildingType.Stall),
      new Building(BuildingType.Strahus),
      new Building(BuildingType.Hof),
      new Building(BuildingType.Offerkapell),
      new Building(BuildingType.Hytte),
      new Building(BuildingType.Festning),
      new Building(BuildingType.Trehytte),
      new Building(BuildingType.Gjestgiveri),
      new Building(BuildingType.Vatnsvei),
      new Building(BuildingType.Gydingar),
    ];
  }

  public isNone(): boolean {
    return this.value === BuildingType.None;
  }

  public getLabel(): string {
    switch (this.value) {
      case BuildingType.Kloster:
        return "Kloster";
      case BuildingType.Gard:
        return "Gård";
      case BuildingType.Vaktarn:
        return "Vaktårn";
      case BuildingType.Pergola:
        return "Pergola";
      case BuildingType.Vertshus:
        return "Vertshus";
      case BuildingType.Kornlager:
        return "Kornlager";
      case BuildingType.Landgard:
        return "Landgård";
      case BuildingType.Postgard:
        return "Postgård";
      case BuildingType.Svinehus:
        return "Svinehus";
      case BuildingType.Steinbru:
        return "Steinbru";
      case BuildingType.Taketbru:
        return "Taketbru";
      case BuildingType.Vannmolle:
        return "Vannmølle";
      case BuildingType.Vindmolle:
        return "Vindmølle";
      case BuildingType.Litenhus:
        return "Liten Hus";
      case BuildingType.Byhus:
        return "Byhus";
      case BuildingType.Landhus:
        return "Landhus";
      case BuildingType.Borgerskapshus:
        return "Borgerskapshus";
      case BuildingType.Vaskeri:
        return "Vaskeri";
      case BuildingType.Strahytte:
        return "Stråhytte";
      case BuildingType.Hotell:
        return "Hotell";
      case BuildingType.Markedshall:
        return "Markedshall";
      case BuildingType.Smie:
        return "Smie";
      case BuildingType.Fjos:
        return "Fjos";
      case BuildingType.Kirke:
        return "Kirke";
      case BuildingType.Stall:
        return "Stall";
      case BuildingType.Strahus:
        return "Stråhus";
      case BuildingType.Hof:
        return "Hof";
      case BuildingType.Offerkapell:
        return "Offerkapell";
      case BuildingType.Hytte:
        return "Hytte";
      case BuildingType.Festning:
        return "Festning";
      case BuildingType.Trehytte:
        return "Trehytte";
      case BuildingType.Gjestgiveri:
        return "Gjestgiveri";
      case BuildingType.Vatnsvei:
        return "Vatnsvei";
      case BuildingType.Gydingar:
        return "Gyðingar";
      default:
        return "None";
    }
  }

  public getImage(): string {
    switch (this.value) {
      case BuildingType.Kloster:
        return "building-house-blue";
      case BuildingType.Gard:
        return "building-house-blue";
      case BuildingType.Vaktarn:
        return "building-house-blue";
      case BuildingType.Pergola:
        return "building-house-blue";
      case BuildingType.Vertshus:
        return "building-house-blue";
      case BuildingType.Kornlager:
        return "building-house-blue";
      case BuildingType.Landgard:
        return "building-house-blue";
      case BuildingType.Postgard:
        return "building-house-blue";
      case BuildingType.Svinehus:
        return "building-house-blue";
      case BuildingType.Steinbru:
        return "building-house-blue";
      case BuildingType.Taketbru:
        return "building-house-blue";
      case BuildingType.Vannmolle:
        return "building-house-blue";
      case BuildingType.Vindmolle:
        return "building-house-blue";
      case BuildingType.Litenhus:
        return "building-house-blue";
      case BuildingType.Byhus:
        return "building-house-blue";
      case BuildingType.Landhus:
        return "building-house-blue";
      case BuildingType.Borgerskapshus:
        return "building-house-blue";
      case BuildingType.Vaskeri:
        return "building-house-blue";
      case BuildingType.Strahytte:
        return "building-house-blue";
      case BuildingType.Hotell:
        return "building-house-blue";
      case BuildingType.Markedshall:
        return "building-house-blue";
      case BuildingType.Smie:
        return "building-house-blue";
      case BuildingType.Fjos:
        return "building-house-blue";
      case BuildingType.Kirke:
        return "building-house-blue";
      case BuildingType.Stall:
        return "building-house-blue";
      case BuildingType.Strahus:
        return "building-house-blue";
      case BuildingType.Hof:
        return "building-house-blue";
      case BuildingType.Offerkapell:
        return "building-house-blue";
      case BuildingType.Hytte:
        return "building-house-blue";
      case BuildingType.Festning:
        return "building-house-blue";
      case BuildingType.Trehytte:
        return "building-house-blue";
      case BuildingType.Gjestgiveri:
        return "building-house-blue";
      case BuildingType.Vatnsvei:
        return "building-house-blue";
      case BuildingType.Gydingar:
        return "building-house-blue";
      default:
        return "none";
    }
  }

  public getRequirement(): Resource {
    switch (this.value) {
      case BuildingType.Kloster:
        return Kloster.requirement();
      case BuildingType.Gard:
        return Gard.requirement();
      case BuildingType.Vaktarn:
        return Vaktarn.requirement();
      case BuildingType.Pergola:
        return Pergola.requirement();
      case BuildingType.Vertshus:
        return Vertshus.requirement();
      case BuildingType.Kornlager:
        return Kornlager.requirement();
      case BuildingType.Landgard:
        return Landgard.requirement();
      case BuildingType.Postgard:
        return Postgard.requirement();
      case BuildingType.Svinehus:
        return Svinehus.requirement();
      case BuildingType.Steinbru:
        return Steinbru.requirement();
      case BuildingType.Taketbru:
        return Taketbru.requirement();
      case BuildingType.Vannmolle:
        return Vannmolle.requirement();
      case BuildingType.Vindmolle:
        return Vindmolle.requirement();
      case BuildingType.Litenhus:
        return Litenhus.requirement();
      case BuildingType.Byhus:
        return Byhus.requirement();
      case BuildingType.Landhus:
        return Landhus.requirement();
      case BuildingType.Borgerskapshus:
        return Borgerskapshus.requirement();
      case BuildingType.Vaskeri:
        return Vaskeri.requirement();
      case BuildingType.Strahytte:
        return Strahytte.requirement();
      case BuildingType.Hotell:
        return Hotell.requirement();
      case BuildingType.Markedshall:
        return Markedshall.requirement();
      case BuildingType.Smie:
        return Smie.requirement();
      case BuildingType.Fjos:
        return Fjos.requirement();
      case BuildingType.Kirke:
        return Kirke.requirement();
      case BuildingType.Stall:
        return Stall.requirement();
      case BuildingType.Strahus:
        return Strahus.requirement();
      case BuildingType.Hof:
        return Hof.requirement();
      case BuildingType.Offerkapell:
        return Offerkapell.requirement();
      case BuildingType.Hytte:
        return Hytte.requirement();
      case BuildingType.Festning:
        return Festning.requirement();
      case BuildingType.Trehytte:
        return Trehytte.requirement();
      case BuildingType.Gjestgiveri:
        return Gjestgiveri.requirement();
      case BuildingType.Vatnsvei:
        return Vatnsvei.requirement();
      case BuildingType.Gydingar:
        return Gydingar.requirement();
      default:
        return new Resource(0, 0, 0, 0);
    }
  }

  public getScore(): number {
    switch (this.value) {
      case BuildingType.Kloster:
        return Kloster.score();
      case BuildingType.Gard:
        return Gard.score();
      case BuildingType.Vaktarn:
        return Vaktarn.score();
      case BuildingType.Pergola:
        return Pergola.score();
      case BuildingType.Vertshus:
        return Vertshus.score();
      case BuildingType.Kornlager:
        return Kornlager.score();
      case BuildingType.Landgard:
        return Landgard.score();
      case BuildingType.Postgard:
        return Postgard.score();
      case BuildingType.Svinehus:
        return Svinehus.score();
      case BuildingType.Steinbru:
        return Steinbru.score();
      case BuildingType.Taketbru:
        return Taketbru.score();
      case BuildingType.Vannmolle:
        return Vannmolle.score();
      case BuildingType.Vindmolle:
        return Vindmolle.score();
      case BuildingType.Litenhus:
        return Litenhus.score();
      case BuildingType.Byhus:
        return Byhus.score();
      case BuildingType.Landhus:
        return Landhus.score();
      case BuildingType.Borgerskapshus:
        return Borgerskapshus.score();
      case BuildingType.Vaskeri:
        return Vaskeri.score();
      case BuildingType.Strahytte:
        return Strahytte.score();
      case BuildingType.Hotell:
        return Hotell.score();
      case BuildingType.Markedshall:
        return Markedshall.score();
      case BuildingType.Smie:
        return Smie.score();
      case BuildingType.Fjos:
        return Fjos.score();
      case BuildingType.Kirke:
        return Kirke.score();
      case BuildingType.Stall:
        return Stall.score();
      case BuildingType.Strahus:
        return Strahus.score();
      case BuildingType.Hof:
        return Hof.score();
      case BuildingType.Offerkapell:
        return Offerkapell.score();
      case BuildingType.Hytte:
        return Hytte.score();
      case BuildingType.Festning:
        return Festning.score();
      case BuildingType.Trehytte:
        return Trehytte.score();
      case BuildingType.Gjestgiveri:
        return Gjestgiveri.score();
      case BuildingType.Vatnsvei:
        return Vatnsvei.score();
      case BuildingType.Gydingar:
        return Gydingar.score();
      default:
        return 0;
    }
  }

  public getGold(): number {
    switch (this.value) {
      case BuildingType.Kloster:
        return Kloster.gold();
      case BuildingType.Gard:
        return Gard.gold();
      case BuildingType.Vaktarn:
        return Vaktarn.gold();
      case BuildingType.Pergola:
        return Pergola.gold();
      case BuildingType.Vertshus:
        return Vertshus.gold();
      case BuildingType.Kornlager:
        return Kornlager.gold();
      case BuildingType.Landgard:
        return Landgard.gold();
      case BuildingType.Postgard:
        return Postgard.gold();
      case BuildingType.Svinehus:
        return Svinehus.gold();
      case BuildingType.Steinbru:
        return Steinbru.gold();
      case BuildingType.Taketbru:
        return Taketbru.gold();
      case BuildingType.Vannmolle:
        return Vannmolle.gold();
      case BuildingType.Vindmolle:
        return Vindmolle.gold();
      case BuildingType.Litenhus:
        return Litenhus.gold();
      case BuildingType.Byhus:
        return Byhus.gold();
      case BuildingType.Landhus:
        return Landhus.gold();
      case BuildingType.Borgerskapshus:
        return Borgerskapshus.gold();
      case BuildingType.Vaskeri:
        return Vaskeri.gold();
      case BuildingType.Strahytte:
        return Strahytte.gold();
      case BuildingType.Hotell:
        return Hotell.gold();
      case BuildingType.Markedshall:
        return Markedshall.gold();
      case BuildingType.Smie:
        return Smie.gold();
      case BuildingType.Fjos:
        return Fjos.gold();
      case BuildingType.Kirke:
        return Kirke.gold();
      case BuildingType.Stall:
        return Stall.gold();
      case BuildingType.Strahus:
        return Strahus.gold();
      case BuildingType.Hof:
        return Hof.gold();
      case BuildingType.Offerkapell:
        return Offerkapell.gold();
      case BuildingType.Hytte:
        return Hytte.gold();
      case BuildingType.Festning:
        return Festning.gold();
      case BuildingType.Trehytte:
        return Trehytte.gold();
      case BuildingType.Gjestgiveri:
        return Gjestgiveri.gold();
      case BuildingType.Vatnsvei:
        return Vatnsvei.gold();
      case BuildingType.Gydingar:
        return Gydingar.gold();
      default:
        return 0;
    }
  }
}
