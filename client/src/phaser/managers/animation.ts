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
    // Animations
    scene.anims.create({
      key: `human-fighter-down`,
      frames: scene.anims.generateFrameNumbers(`human-fighter`, {
        start: 0,
        end: 0,
      }),
      frameRate: 3,
      repeat: 0,
    });
    scene.anims.create({
      key: `human-fighter-death`,
      frames: scene.anims.generateFrameNumbers(`human-fighter`, {
        start: 24,
        end: 24,
      }),
      frameRate: 2,
      repeat: 0,
    });
    scene.anims.create({
      key: `human-fighter-idle-down`,
      frames: scene.anims.generateFrameNumbers(`human-fighter`, {
        start: 5,
        end: 6,
      }),
      frameRate: 3,
      repeat: -1,
    });
    scene.anims.create({
      key: `human-fighter-idle-right`,
      frames: scene.anims.generateFrameNumbers(`human-fighter`, {
        start: 5 + 29 * 2,
        end: 6 + 29 * 2,
      }),
      frameRate: 3,
      repeat: -1,
    });
    scene.anims.create({
      key: `human-fighter-idle-up`,
      frames: scene.anims.generateFrameNumbers(`human-fighter`, {
        start: 5 + 29 * 4,
        end: 6 + 29 * 4,
      }),
      frameRate: 3,
      repeat: -1,
    });
    scene.anims.create({
      key: `human-fighter-idle-left`,
      frames: scene.anims.generateFrameNumbers(`human-fighter`, {
        start: 5 + 29 * 6,
        end: 6 + 29 * 6,
      }),
      frameRate: 3,
      repeat: -1,
    });
    scene.anims.create({
      key: `human-fighter-move-down`,
      frames: scene.anims.generateFrameNumbers(`human-fighter`, {
        start: 1,
        end: 4,
      }),
      frameRate: 5,
      repeat: -1,
    });
    scene.anims.create({
      key: `human-fighter-move-right`,
      frames: scene.anims.generateFrameNumbers(`human-fighter`, {
        start: 1 + 29 * 2,
        end: 4 + 29 * 2,
      }),
      frameRate: 5,
      repeat: -1,
    });
    scene.anims.create({
      key: `human-fighter-move-up`,
      frames: scene.anims.generateFrameNumbers(`human-fighter`, {
        start: 1 + 29 * 4,
        end: 4 + 29 * 4,
      }),
      frameRate: 5,
      repeat: -1,
    });
    scene.anims.create({
      key: `human-fighter-move-left`,
      frames: scene.anims.generateFrameNumbers(`human-fighter`, {
        start: 1 + 29 * 6,
        end: 4 + 29 * 6,
      }),
      frameRate: 5,
      repeat: -1,
    });
    scene.anims.create({
      key: `human-fighter-stand-down`,
      frames: scene.anims.generateFrameNumbers(`human-fighter`, {
        start: 5,
        end: 6,
      }),
      frameRate: 5,
      repeat: -1,
    });
    scene.anims.create({
      key: `human-fighter-dash-down`,
      frames: scene.anims.generateFrameNumbers(`human-fighter`, {
        start: 7,
        end: 8,
      }),
      frameRate: 5,
      repeat: 0,
    });
    scene.anims.create({
      key: `human-fighter-dash-right`,
      frames: scene.anims.generateFrameNumbers(`human-fighter`, {
        start: 7 + 29 * 2,
        end: 8 + 29 * 2,
      }),
      frameRate: 5,
      repeat: 0,
    });
    scene.anims.create({
      key: `human-fighter-dash-up`,
      frames: scene.anims.generateFrameNumbers(`human-fighter`, {
        start: 7 + 29 * 4,
        end: 8 + 29 * 4,
      }),
      frameRate: 5,
      repeat: 0,
    });
    scene.anims.create({
      key: `human-fighter-dash-left`,
      frames: scene.anims.generateFrameNumbers(`human-fighter`, {
        start: 7 + 29 * 6,
        end: 8 + 29 * 6,
      }),
      frameRate: 5,
      repeat: 0,
    });
    scene.anims.create({
      key: `human-fighter-jump-down`,
      frames: scene.anims.generateFrameNumbers(`human-fighter`, {
        frames: [25, 28],
      }),
      frameRate: 5,
      repeat: 0,
    });
    scene.anims.create({
      key: `human-fighter-jump-right`,
      frames: scene.anims.generateFrameNumbers(`human-fighter`, {
        frames: [25 + 29 * 2, 28 + 29 * 2],
      }),
      frameRate: 5,
      repeat: 0,
    });
    scene.anims.create({
      key: `human-fighter-jump-up`,
      frames: scene.anims.generateFrameNumbers(`human-fighter`, {
        frames: [25 + 29 * 4, 28 + 29 * 4],
      }),
      frameRate: 5,
      repeat: 0,
    });
    scene.anims.create({
      key: `human-fighter-jump-left`,
      frames: scene.anims.generateFrameNumbers(`human-fighter`, {
        frames: [25 + 29 * 6, 28 + 29 * 6],
      }),
      frameRate: 5,
      repeat: 0,
    });
  }
}

export default AnimationManager;
