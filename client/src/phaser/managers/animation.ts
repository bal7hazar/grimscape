import Phaser from "phaser";

class AnimationManager {
  public pawnColors: string[] = ["blue", "purple", "red", "yellow"];
  public pawnCategories: string[] = [
    "idle",
    "move",
    "hit",
    "cut",
    "carry-idle",
    "carry-move",
  ];
  static instance: AnimationManager;

  constructor() {
    if (AnimationManager.instance) {
      return AnimationManager.instance;
    }
    AnimationManager.instance = this;
  }

  static getInstance() {
    if (!AnimationManager.instance) {
      AnimationManager.instance = new AnimationManager();
    }
    return AnimationManager.instance;
  }

  addAnimations(scene: Phaser.Scene) {
    // Pawn Animations
    for (let color of this.pawnColors) {
      let offset = 0;
      for (let cat of this.pawnCategories) {
        scene.anims.create({
          key: `pawn-${color}-${cat}`,
          frames: scene.anims.generateFrameNumbers(`pawn-${color}`, {
            start: 0 + offset,
            end: 5 + offset,
          }),
          frameRate: 10,
          repeat: -1,
        });
        offset += 6;
      }
    }
  }
}

export default AnimationManager;
