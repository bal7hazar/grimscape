import Phaser from "phaser";

class AnimationManager {
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
    // Resources
    const resources = ["human-fighter", "skeleton-worker"];
    // Animations
    resources.forEach((resource) => {
      scene.anims.create({
        key: `${resource}-down`,
        frames: scene.anims.generateFrameNumbers(`${resource}`, {
          start: 0,
          end: 0,
        }),
        frameRate: 3,
        repeat: 0,
      });
      scene.anims.create({
        key: `${resource}-death`,
        frames: scene.anims.generateFrameNumbers(`${resource}`, {
          start: 24,
          end: 24,
        }),
        frameRate: 2,
        repeat: 0,
      });
      scene.anims.create({
        key: `${resource}-idle-down`,
        frames: scene.anims.generateFrameNumbers(`${resource}`, {
          start: 5,
          end: 6,
        }),
        frameRate: 3,
        repeat: -1,
      });
      scene.anims.create({
        key: `${resource}-idle-right`,
        frames: scene.anims.generateFrameNumbers(`${resource}`, {
          start: 5 + 29 * 2,
          end: 6 + 29 * 2,
        }),
        frameRate: 3,
        repeat: -1,
      });
      scene.anims.create({
        key: `${resource}-idle-up`,
        frames: scene.anims.generateFrameNumbers(`${resource}`, {
          start: 5 + 29 * 4,
          end: 6 + 29 * 4,
        }),
        frameRate: 3,
        repeat: -1,
      });
      scene.anims.create({
        key: `${resource}-idle-left`,
        frames: scene.anims.generateFrameNumbers(`${resource}`, {
          start: 5 + 29 * 6,
          end: 6 + 29 * 6,
        }),
        frameRate: 3,
        repeat: -1,
      });
      scene.anims.create({
        key: `${resource}-move-down`,
        frames: scene.anims.generateFrameNumbers(`${resource}`, {
          start: 1,
          end: 4,
        }),
        frameRate: 5,
        repeat: -1,
      });
      scene.anims.create({
        key: `${resource}-move-right`,
        frames: scene.anims.generateFrameNumbers(`${resource}`, {
          start: 1 + 29 * 2,
          end: 4 + 29 * 2,
        }),
        frameRate: 5,
        repeat: -1,
      });
      scene.anims.create({
        key: `${resource}-move-up`,
        frames: scene.anims.generateFrameNumbers(`${resource}`, {
          start: 1 + 29 * 4,
          end: 4 + 29 * 4,
        }),
        frameRate: 5,
        repeat: -1,
      });
      scene.anims.create({
        key: `${resource}-move-left`,
        frames: scene.anims.generateFrameNumbers(`${resource}`, {
          start: 1 + 29 * 6,
          end: 4 + 29 * 6,
        }),
        frameRate: 5,
        repeat: -1,
      });
      scene.anims.create({
        key: `${resource}-stand-down`,
        frames: scene.anims.generateFrameNumbers(`${resource}`, {
          start: 5,
          end: 6,
        }),
        frameRate: 5,
        repeat: -1,
      });
      scene.anims.create({
        key: `${resource}-dash-down`,
        frames: scene.anims.generateFrameNumbers(`${resource}`, {
          start: 7,
          end: 8,
        }),
        frameRate: 5,
        repeat: 0,
      });
      scene.anims.create({
        key: `${resource}-dash-right`,
        frames: scene.anims.generateFrameNumbers(`${resource}`, {
          start: 7 + 29 * 2,
          end: 8 + 29 * 2,
        }),
        frameRate: 5,
        repeat: 0,
      });
      scene.anims.create({
        key: `${resource}-dash-up`,
        frames: scene.anims.generateFrameNumbers(`${resource}`, {
          start: 7 + 29 * 4,
          end: 8 + 29 * 4,
        }),
        frameRate: 5,
        repeat: 0,
      });
      scene.anims.create({
        key: `${resource}-dash-left`,
        frames: scene.anims.generateFrameNumbers(`${resource}`, {
          start: 7 + 29 * 6,
          end: 8 + 29 * 6,
        }),
        frameRate: 5,
        repeat: 0,
      });
      scene.anims.create({
        key: `${resource}-jump-down`,
        frames: scene.anims.generateFrameNumbers(`${resource}`, {
          frames: [25, 28],
        }),
        frameRate: 5,
        repeat: 0,
      });
      scene.anims.create({
        key: `${resource}-jump-right`,
        frames: scene.anims.generateFrameNumbers(`${resource}`, {
          frames: [25 + 29 * 2, 28 + 29 * 2],
        }),
        frameRate: 5,
        repeat: 0,
      });
      scene.anims.create({
        key: `${resource}-jump-up`,
        frames: scene.anims.generateFrameNumbers(`${resource}`, {
          frames: [25 + 29 * 4, 28 + 29 * 4],
        }),
        frameRate: 5,
        repeat: 0,
      });
      scene.anims.create({
        key: `${resource}-jump-left`,
        frames: scene.anims.generateFrameNumbers(`${resource}`, {
          frames: [25 + 29 * 6, 28 + 29 * 6],
        }),
        frameRate: 5,
        repeat: 0,
      });
      scene.anims.create({
        key: `${resource}-hit-down`,
        frames: scene.anims.generateFrameNumbers(`${resource}`, {
          frames: [6, 7, 8],
        }),
        frameRate: 5,
        repeat: 0,
      });
      scene.anims.create({
        key: `${resource}-hit-right`,
        frames: scene.anims.generateFrameNumbers(`${resource}`, {
          frames: [6 + 29 * 2, 7 + 29 * 2, 8 + 29 * 2],
        }),
        frameRate: 5,
        repeat: 0,
      });
      scene.anims.create({
        key: `${resource}-hit-up`,
        frames: scene.anims.generateFrameNumbers(`${resource}`, {
          frames: [6 + 29 * 4, 7 + 29 * 4, 8 + 29 * 4],
        }),
        frameRate: 5,
        repeat: 0,
      });
      scene.anims.create({
        key: `${resource}-hit-left`,
        frames: scene.anims.generateFrameNumbers(`${resource}`, {
          frames: [6 + 29 * 6, 7 + 29 * 6, 8 + 29 * 6],
        }),
        frameRate: 5,
        repeat: 0,
      });
      scene.anims.create({
        key: `${resource}-damage-down`,
        frames: scene.anims.generateFrameNumbers(`${resource}`, {
          frames: [20, 21, 22],
        }),
        frameRate: 5,
        repeat: 0,
      });
      scene.anims.create({
        key: `${resource}-damage-right`,
        frames: scene.anims.generateFrameNumbers(`${resource}`, {
          frames: [20 + 29 * 2, 21 + 29 * 2, 22 + 29 * 2],
        }),
        frameRate: 5,
        repeat: 0,
      });
      scene.anims.create({
        key: `${resource}-damage-up`,
        frames: scene.anims.generateFrameNumbers(`${resource}`, {
          frames: [20 + 29 * 4, 21 + 29 * 4, 22 + 29 * 4],
        }),
        frameRate: 5,
        repeat: 0,
      });
      scene.anims.create({
        key: `${resource}-damage-left`,
        frames: scene.anims.generateFrameNumbers(`${resource}`, {
          frames: [20 + 29 * 6, 21 + 29 * 6, 22 + 29 * 6],
        }),
        frameRate: 5,
        repeat: 0,
      });
    });
  }
}

export default AnimationManager;
