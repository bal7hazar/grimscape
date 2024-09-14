import Detail from "../elements/detail";

export default class Details extends Phaser.GameObjects.Container {
  protected runestone: Detail;
  protected wood: Detail;
  protected tool: Detail;
  protected fur: Detail;

  constructor(                                             
    scene: Phaser.Scene,
    x: number,
    y: number,
  ) {
    super(scene, x, y);

    // Create button
    this.runestone = new Detail(scene, 0, -39, '1', 'icon-runestone');
    this.wood = new Detail(scene, 0, -13, '2', 'icon-wood');
    this.tool = new Detail(scene, 0, 13, '3', 'icon-tool');
    this.fur = new Detail(scene, 0, 39, '4', 'icon-fur');

    // Add components to container
    this.add(this.runestone.setScrollFactor(0));
    this.add(this.wood.setScrollFactor(0));
    this.add(this.tool.setScrollFactor(0));
    this.add(this.fur.setScrollFactor(0));
  }

  update(runestone: string, wood: string, tool: string, fur: string) {
    this.runestone.update(runestone);
    this.wood.update(wood);
    this.tool.update(tool);
    this.fur.update(fur);
  }

  flipX() {
    this.runestone.flipX();
    this.wood.flipX();
    this.tool.flipX();
    this.fur.flipX();
  }
}
