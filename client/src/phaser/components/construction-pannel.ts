import Command from "../elements/command";
import Pairing from "../elements/pairing";
import Resource from "../elements/resource";
import GameManager from "../managers/game";

export default class ConstructionPannel extends Phaser.GameObjects.Container {
  protected hitbox: Phaser.GameObjects.Rectangle;
  protected buildingBanner: Phaser.GameObjects.Image;
  protected builderBanner: Phaser.GameObjects.Image;
  protected buildingCarved: Phaser.GameObjects.Image;
  protected builderCarved: Phaser.GameObjects.Image;
  protected buttonCarved: Phaser.GameObjects.Image;
  protected buildingRibbon: Phaser.GameObjects.Image;
  protected builderRibbon: Phaser.GameObjects.Image;
  protected buildingLabel: Phaser.GameObjects.Text;
  protected builderLabel: Phaser.GameObjects.Text;
  protected building: Phaser.GameObjects.Image;
  protected builder: Phaser.GameObjects.Sprite;
  protected runestone: Pairing;
  protected wood: Pairing;
  protected tool: Pairing;
  protected fur: Pairing;
  protected gold: Resource;
  protected score: Resource;
  protected cost: Resource;
  protected action: Resource;
  protected close: Command;
  protected disabled: boolean = false;
  private buildingId: number = 0;
  private builderId: number = 0;
  private buildingKey: string = "";
  private builderKey: string = "";

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
      0,
      352,
      608,
      0x000000,
      0,
    );
    this.buildingBanner = new Phaser.GameObjects.Image(
      scene,
      0,
      -168,
      "banner-v-up-w7-h5",
    );
    this.builderBanner = new Phaser.GameObjects.Image(
      scene,
      0,
      164,
      "banner-v-down-w7-h5",
    );
    this.buildingCarved = new Phaser.GameObjects.Image(
      scene,
      0,
      -200,
      "carved-w5-h2",
    );
    this.builderCarved = new Phaser.GameObjects.Image(
      scene,
      -96,
      196,
      "carved-w2-h2",
    );
    this.buttonCarved = new Phaser.GameObjects.Image(
      scene,
      64,
      196,
      "carved-w3-h1",
    );
    this.buildingRibbon = new Phaser.GameObjects.Image(
      scene,
      0,
      -104,
      "ribbon-w5-h1-yellow",
    );
    this.builderRibbon = new Phaser.GameObjects.Image(
      scene,
      0,
      100,
      "ribbon-w5-h1-yellow",
    );

    // Commands
    this.close = new Command(
      scene,
      196,
      -224,
      "icon-close",
      "icon-close-pressed",
      { onRelease: handleClose },
    );

    // Create label
    this.buildingLabel = new Phaser.GameObjects.Text(
      scene,
      0,
      -112,
      "Building",
      {
        fontFamily: "Norse",
        fontSize: 32,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
      },
    ).setOrigin(0.5, 0.5);
    this.builderLabel = new Phaser.GameObjects.Text(scene, 0, 92, "Worker", {
      fontFamily: "Norse",
      fontSize: 32,
      color: "#ffffff",
      stroke: "#000000",
      strokeThickness: 8,
    }).setOrigin(0.5, 0.5);

    // Add sprites
    this.building = new Phaser.GameObjects.Image(
      scene,
      0,
      -232,
      "building-house-blue",
    );
    this.builder = scene.add.sprite(-96, 164, "pawn-blue");
    this.builder.setScale(1.5);

    // Resources
    this.runestone = new Pairing(scene, -96, 0, "0", "0", "icon-runestone");
    this.wood = new Pairing(scene, -32, 0, "0", "0", "icon-wood");
    this.tool = new Pairing(scene, 32, 0, "0", "0", "icon-tool");
    this.fur = new Pairing(scene, 96, 0, "0", "0", "icon-fur");
    this.gold = new Resource(
      scene,
      160,
      -104,
      "ribbon-w4-h1-red",
      "0",
      "icon-gold",
    );
    this.score = new Resource(
      scene,
      160,
      -168,
      "ribbon-w4-h1-red",
      "0",
      "icon-score",
    );
    this.cost = new Resource(
      scene,
      -160,
      164,
      "ribbon-w4-h1-red",
      "0",
      "icon-gold",
    );
    this.cost.flipX();
    this.action = new Resource(
      scene,
      -160,
      228,
      "ribbon-w4-h1-red",
      "1",
      "icon-action",
    );
    this.action.flipX();

    // Depths
    this.hitbox.setDepth(0);
    this.runestone.setDepth(0);
    this.wood.setDepth(0);
    this.tool.setDepth(0);
    this.fur.setDepth(0);
    this.close.setDepth(0);
    this.gold.setDepth(0);
    this.score.setDepth(0);
    this.cost.setDepth(0);
    this.action.setDepth(0);
    this.buildingBanner.setDepth(1);
    this.builderBanner.setDepth(1);
    this.buildingCarved.setDepth(2);
    this.builderCarved.setDepth(2);
    this.buttonCarved.setDepth(2);
    this.buildingRibbon.setDepth(3);
    this.builderRibbon.setDepth(3);
    this.buildingLabel.setDepth(4);
    this.builderLabel.setDepth(4);
    this.building.setDepth(5);
    this.builder.setDepth(5);

    // Prevent click through
    this.hitbox.setInteractive().setScrollFactor(0);

    // Add components to container
    this.add(this.hitbox);
    this.add(this.buildingBanner);
    this.add(this.builderBanner);
    this.add(this.buildingCarved);
    this.add(this.builderCarved);
    this.add(this.buttonCarved);
    this.add(this.buildingRibbon);
    this.add(this.builderRibbon);
    this.add(this.buildingLabel);
    this.add(this.builderLabel);
    this.add(this.building);
    this.add(this.builder);
    this.add(this.runestone);
    this.add(this.wood);
    this.add(this.tool);
    this.add(this.fur);
    this.add(this.gold);
    this.add(this.score);
    this.add(this.cost);
    this.add(this.action);
    this.add(this.close);
    this.sort("depth");

    // Default visibility
    this.building.setVisible(false);
    this.builder.setVisible(false);
  }

  update() {
    // Building
    const buildingId = GameManager.getInstance().getSelectedBuildingId();
    const buildingKey = GameManager.getInstance().isBuilt(buildingId)
      ? `building-house-blue`
      : `building-house-construction`;
    if (
      !!buildingId &&
      (this.buildingId != buildingId || this.buildingKey != buildingKey)
    ) {
      // Building info
      const building = GameManager.getInstance().getSelectedBuilding();
      this.buildingLabel.setText(`${building.getLabel()}`);
      this.gold.update(`${building.getGold()}`);
      this.score.update(`${building.getScore()}`);
      // Texture
      this.building.setTexture(buildingKey);
      this.buildingKey = buildingKey;
      // Resources info
      const resource = building.getRequirement();
      this.runestone.update({ topText: `${resource.runestone}` });
      this.wood.update({ topText: `${resource.wood}` });
      this.tool.update({ topText: `${resource.tools}` });
      this.fur.update({ topText: `${resource.fur}` });
      // Building ID
      this.buildingId = buildingId;
      this.building.setVisible(true);
    }

    // Builder
    const builderId = GameManager.getInstance().getSelectedBuilderId();
    const builderKey = GameManager.getInstance().isIdle(builderId)
      ? `idle`
      : `hit`;
    if (
      !!builderId &&
      (this.builderId != builderId || this.builderKey != builderKey)
    ) {
      // Builder info
      const builder = GameManager.getInstance().getSelectedBuilder();
      this.builderLabel.setText(`${builder.getLabel()}`);
      this.cost.update(`${builder.getCost()}`);
      // Texture
      this.builderKey = builderKey;
      const image = builder.getImage();
      this.builder.setTexture(image);
      this.builder.play(`${image}-${builderKey}`);
      // Resources info
      const resource = GameManager.getInstance().getBuilderResource(builderId);
      this.runestone.update({ bottomText: `${resource.runestone}` });
      this.wood.update({ bottomText: `${resource.wood}` });
      this.tool.update({ bottomText: `${resource.tools}` });
      this.fur.update({ bottomText: `${resource.fur}` });
      // Building ID
      this.builderId = builderId;
      this.builder.setVisible(true);
    }
  }
}
