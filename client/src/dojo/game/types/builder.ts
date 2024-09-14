import { Trainee } from "../elements/builders/trainee";
import { Worker } from "../elements/builders/worker";
import { Expert } from "../elements/builders/expert";
import { Master } from "../elements/builders/master";
import { Resource } from "./resource";

export enum BuilderType {
  None = "None",
  Trainee = "Trainee",
  Worker = "Worker",
  Expert = "Expert",
  Master = "Master",
}

export class Builder {
  value: BuilderType;

  constructor(value: BuilderType) {
    this.value = value;
  }

  public into(): number {
    return Object.values(BuilderType).indexOf(this.value);
  }

  public static from(index: number): Builder {
    const item = Object.values(BuilderType)[index];
    return new Builder(item);
  }

  public static getBuilders(): Builder[] {
    return [
      new Builder(BuilderType.Trainee),
      new Builder(BuilderType.Worker),
      new Builder(BuilderType.Expert),
      new Builder(BuilderType.Master),
    ];
  }

  public isNone(): boolean {
    return this.value === BuilderType.None;
  }

  public getLabel(): string {
    switch (this.value) {
      case BuilderType.Trainee:
        return "Apprentice";
      case BuilderType.Worker:
        return "Laborer";
      case BuilderType.Expert:
        return "Expert";
      case BuilderType.Master:
        return "Master";
      default:
        return "None";
    }
  }

  public getImage(): string {
    switch (this.value) {
      case BuilderType.Trainee:
        return "pawn-blue";
      case BuilderType.Worker:
        return "pawn-purple";
      case BuilderType.Expert:
        return "pawn-red";
      case BuilderType.Master:
        return "pawn-yellow";
      default:
        return "none";
    }
  }

  public getCost(): number {
    switch (this.value) {
      case BuilderType.Trainee:
        return Trainee.cost();
      case BuilderType.Worker:
        return Worker.cost();
      case BuilderType.Expert:
        return Expert.cost();
      case BuilderType.Master:
        return Master.cost();
      default:
        return 0;
    }
  }

  public getCount(): number {
    switch (this.value) {
      case BuilderType.Trainee:
        return Trainee.count();
      case BuilderType.Worker:
        return Worker.count();
      case BuilderType.Expert:
        return Expert.count();
      case BuilderType.Master:
        return Master.count();
      default:
        return 0;
    }
  }

  public getResource(version: number): Resource {
    switch (this.value) {
      case BuilderType.Trainee:
        return Trainee.resource(version);
      case BuilderType.Worker:
        return Worker.resource(version);
      case BuilderType.Expert:
        return Expert.resource(version);
      case BuilderType.Master:
        return Master.resource(version);
      default:
        return new Resource(0, 0, 0, 0);
    }
  }
}
