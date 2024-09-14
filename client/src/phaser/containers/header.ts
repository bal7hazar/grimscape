import Gold from "../components/gold";
import Action from "../components/action";
import Score from "../components/score";

export default class Header extends Phaser.GameObjects.Container {
  gold: Gold | null = null;
  action: Action | null = null;
  score: Score | null = null;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    this.score = new Score(scene, 0, 0);
    this.score.setScrollFactor(0, 0);
    this.score.setDepth(2);

    this.gold = new Gold(scene, -160, 0);
    this.gold.setScrollFactor(0, 0);
    this.score.setDepth(1);

    this.action = new Action(scene, 160, 0);
    this.action.setScrollFactor(0, 0);
    this.score.setDepth(1);

    // Add components to container
    this.add(this.score);
    this.add(this.gold);
    this.add(this.action);
    this.sort("depth");
  }

  update() {
    this.score?.update();
    this.gold?.update();
    this.action?.update();
  }
}
