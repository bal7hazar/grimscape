export class Resource {
  public runestone: number;
  public wood: number;
  public tools: number;
  public fur: number;
  public message: string;

  constructor(
    runestone: number,
    wood: number,
    tools: number,
    fur: number,
    message = "",
  ) {
    this.runestone = runestone;
    this.wood = wood;
    this.tools = tools;
    this.fur = fur;
    this.message = message;
  }

  public add(resource: Resource): Resource {
    return new Resource(
      this.runestone + resource.runestone,
      this.wood + resource.wood,
      this.tools + resource.tools,
      this.fur + resource.fur,
    );
  }

  public isEqual(resource: Resource): boolean {
    return (
      this.runestone === resource.runestone &&
      this.wood === resource.wood &&
      this.tools === resource.tools &&
      this.fur === resource.fur
    );
  }

  public isGe(resource: Resource): boolean {
    return (
      this.runestone >= resource.runestone &&
      this.wood >= resource.wood &&
      this.tools >= resource.tools &&
      this.fur >= resource.fur
    );
  }

  public isNull(): boolean {
    return this.isEqual(new Resource(0, 0, 0, 0));
  }
}
