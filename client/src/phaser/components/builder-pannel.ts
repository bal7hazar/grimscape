import { Builder } from "@/dojo/game/types/builder";
import Command from "../elements/command";
import Resource from "../elements/resource";
import GameManager from "../managers/game";

export default class BuilderPannel extends Phaser.GameObjects.Container {
  protected hitbox: Phaser.GameObjects.Rectangle;
  protected banner: Phaser.GameObjects.Image;
  protected carved: Phaser.GameObjects.Image;
  protected subbanner: Phaser.GameObjects.Image;
  protected subcarved: Phaser.GameObjects.Image;
  protected ribbon: Phaser.GameObjects.Image;
  protected label: Phaser.GameObjects.Text;
  protected runestone: Resource;
  protected wood: Resource;
  protected tool: Resource;
  protected fur: Resource;
  protected gold: Resource;
  protected action: Resource;
  protected worker: Phaser.GameObjects.Sprite;
  protected close: Command;
  protected pageOne: Command;
  protected pageTwo: Command;
  protected pageThree: Command;
  protected pageFour: Command;
  protected pageFive: Command;
  protected disabled: boolean = false;
  private builderId: number = 0;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    handleClose: () => void,
  ) {
    super(scene, x, y);

    // Images
    this.hitbox = new Phaser.GameObjects.Rectangle(
      scene,
      0,
      32,
      320,
      384,
      0x000000,
      0,
    );
    this.banner = new Phaser.GameObjects.Image(
      scene,
      0,
      0,
      "banner-v-up-w7-h5",
    );
    this.subbanner = new Phaser.GameObjects.Image(
      scene,
      0,
      192,
      "banner-up-w6-h3",
    );
    this.carved = new Phaser.GameObjects.Image(scene, 0, 0, "carved-w5-h3");
    this.subcarved = new Phaser.GameObjects.Image(
      scene,
      0,
      192,
      "carved-w3-h1",
    );
    this.ribbon = new Phaser.GameObjects.Image(
      scene,
      0,
      -128,
      "ribbon-w5-h1-yellow",
    );

    // Commands
    this.close = new Command(
      scene,
      -196,
      -64,
      "icon-close",
      "icon-close-pressed",
      { onRelease: handleClose },
    );
    this.close.flipX();
    this.pageOne = new Command(
      scene,
      -112,
      264,
      "icon-one",
      "icon-one-pressed",
      {
        onRelease: () => this.handlePage(1),
        texture: "ribbon-w1-yellow-up",
        iconY: 26,
      },
    );
    this.pageTwo = new Command(
      scene,
      -56,
      264,
      "icon-two",
      "icon-two-pressed",
      {
        onRelease: () => this.handlePage(2),
        texture: "ribbon-w1-yellow-up",
        iconY: 26,
      },
    );
    this.pageThree = new Command(
      scene,
      0,
      264,
      "icon-three",
      "icon-three-pressed",
      {
        onRelease: () => this.handlePage(3),
        texture: "ribbon-w1-yellow-up",
        iconY: 26,
      },
    );
    this.pageFour = new Command(
      scene,
      56,
      264,
      "icon-four",
      "icon-four-pressed",
      {
        onRelease: () => this.handlePage(4),
        texture: "ribbon-w1-yellow-up",
        iconY: 26,
      },
    );
    this.pageFive = new Command(
      scene,
      112,
      264,
      "icon-five",
      "icon-five-pressed",
      {
        onRelease: () => this.handlePage(5),
        texture: "ribbon-w1-yellow-up",
        iconY: 26,
      },
    );

    // Create label
    this.label = new Phaser.GameObjects.Text(scene, 0, -136, "Workers", {
      fontFamily: "Norse",
      fontSize: 32,
      color: "#ffffff",
      stroke: "#000000",
      strokeThickness: 8,
    }).setOrigin(0.5, 0.5);

    // Resources
    this.runestone = new Resource(
      scene,
      160,
      -64,
      "ribbon-w4-h1-blue",
      "0",
      "icon-runestone",
    );
    this.wood = new Resource(
      scene,
      160,
      0,
      "ribbon-w4-h1-blue",
      "0",
      "icon-wood",
    );
    this.tool = new Resource(
      scene,
      160,
      64,
      "ribbon-w4-h1-blue",
      "0",
      "icon-tool",
    );
    this.fur = new Resource(
      scene,
      160,
      128,
      "ribbon-w4-h1-blue",
      "0",
      "icon-fur",
    );
    this.gold = new Resource(
      scene,
      -160,
      0,
      "ribbon-w4-h1-red",
      "0",
      "icon-gold",
    );
    this.gold.flipX();
    this.action = new Resource(
      scene,
      -128,
      196,
      "ribbon-w4-h1-red",
      "1",
      "icon-action",
    );
    this.action.flipX();

    // Add sprites
    this.worker = scene.add.sprite(0, -32, "pawn-blue");
    this.worker.setScale(1.5);
    this.worker.play("pawn-blue-hit");

    // Depths
    this.hitbox.setDepth(0);
    this.runestone.setDepth(1);
    this.wood.setDepth(1);
    this.tool.setDepth(1);
    this.fur.setDepth(1);
    this.gold.setDepth(1);
    this.action.setDepth(1);
    this.close.setDepth(1);
    this.pageOne.setDepth(1);
    this.pageTwo.setDepth(1);
    this.pageThree.setDepth(1);
    this.pageFour.setDepth(1);
    this.pageFive.setDepth(1);
    this.subbanner.setDepth(2);
    this.subcarved.setDepth(3);
    this.banner.setDepth(3);
    this.carved.setDepth(4);
    this.ribbon.setDepth(4);
    this.label.setDepth(5);
    this.worker.setDepth(5);

    // Prevent click through
    this.hitbox.setInteractive().setScrollFactor(0);

    // Add components to container
    this.add(this.hitbox);
    this.add(this.banner);
    this.add(this.subbanner);
    this.add(this.carved);
    this.add(this.subcarved);
    this.add(this.ribbon);
    this.add(this.close);
    this.add(this.pageOne);
    this.add(this.pageTwo);
    this.add(this.pageThree);
    this.add(this.pageFour);
    this.add(this.pageFive);
    this.add(this.label);
    this.add(this.worker);
    this.add(this.runestone);
    this.add(this.wood);
    this.add(this.tool);
    this.add(this.fur);
    this.add(this.gold);
    this.add(this.action);
    this.sort("depth");
  }

  update() {
    const builderId = GameManager.getInstance().getBuilderId();
    if (this.builderId != builderId) {
      // Building info
      const builder = GameManager.getInstance().getBuilder(builderId);
      this.label.setText(`${builder.getLabel()}`);
      this.gold.update(`${builder.getCost()}`);
      this.worker.setTexture(builder.getImage());
      this.worker.play(`${builder.getImage()}-hit`);
      // Resources info
      const resource = GameManager.getInstance().getBuilderResource(builderId);
      this.runestone.update(`${resource.runestone}`);
      this.wood.update(`${resource.wood}`);
      this.tool.update(`${resource.tools}`);
      this.fur.update(`${resource.fur}`);
      this.builderId = builderId;
      // Page info
      const index = GameManager.getInstance().getBuilderIndex();
      this.pageOne.setPressed(index === 0);
      this.pageTwo.setPressed(index === 1);
      this.pageThree.setPressed(index === 2);
      this.pageFour.setPressed(index === 3);
      this.pageFive.setPressed(index === 4);
    }
  }

  handlePage(page: number) {
    GameManager.getInstance().setBuilder(page - 1);
  }
}
