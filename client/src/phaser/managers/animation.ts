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
      key: `assassin-black-down`,
      frames: scene.anims.generateFrameNumbers(`assassin-black`, {
        start: 0,
        end: 0,
      }),
      frameRate: 3,
      repeat: 0,
    });
    scene.anims.create({
      key: `assassin-black-idle`,
      frames: scene.anims.generateFrameNumbers(`assassin-black`, {
        start: 0,
        end: 1,
      }),
      frameRate: 3,
      repeat: -1,
    });
    scene.anims.create({
      key: `assassin-black-death`,
      frames: scene.anims.generateFrameNumbers(`assassin-black`, {
        start: 24,
        end: 24,
      }),
      frameRate: 2,
      repeat: 0,
    });
    scene.anims.create({
      key: `assassin-black-move-down`,
      frames: scene.anims.generateFrameNumbers(`assassin-black`, {
        start: 1,
        end: 4,
      }),
      frameRate: 5,
      repeat: -1,
    });
    scene.anims.create({
      key: `assassin-black-move-right`,
      frames: scene.anims.generateFrameNumbers(`assassin-black`, {
        start: 1 + 29 * 2,
        end: 4 + 29 * 2,
      }),
      frameRate: 5,
      repeat: -1,
    });
    scene.anims.create({
      key: `assassin-black-move-up`,
      frames: scene.anims.generateFrameNumbers(`assassin-black`, {
        start: 1 + 29 * 4,
        end: 4 + 29 * 4,
      }),
      frameRate: 5,
      repeat: -1,
    });
    scene.anims.create({
      key: `assassin-black-move-left`,
      frames: scene.anims.generateFrameNumbers(`assassin-black`, {
        start: 1 + 29 * 6,
        end: 4 + 29 * 6,
      }),
      frameRate: 5,
      repeat: -1,
    });
    scene.anims.create({
      key: `assassin-black-stand-down`,
      frames: scene.anims.generateFrameNumbers(`assassin-black`, {
        start: 5,
        end: 6,
      }),
      frameRate: 5,
      repeat: -1,
    });
    scene.anims.create({
      key: `assassin-black-dash-down`,
      frames: scene.anims.generateFrameNumbers(`assassin-black`, {
        start: 7,
        end: 8,
      }),
      frameRate: 5,
      repeat: 0,
    });
    scene.anims.create({
      key: `assassin-black-dash-right`,
      frames: scene.anims.generateFrameNumbers(`assassin-black`, {
        start: 7 + 29 * 2,
        end: 8 + 29 * 2,
      }),
      frameRate: 5,
      repeat: 0,
    });
    scene.anims.create({
      key: `assassin-black-dash-up`,
      frames: scene.anims.generateFrameNumbers(`assassin-black`, {
        start: 7 + 29 * 4,
        end: 8 + 29 * 4,
      }),
      frameRate: 5,
      repeat: 0,
    });
    scene.anims.create({
      key: `assassin-black-dash-left`,
      frames: scene.anims.generateFrameNumbers(`assassin-black`, {
        start: 7 + 29 * 6,
        end: 8 + 29 * 6,
      }),
      frameRate: 5,
      repeat: 0,
    });
    scene.anims.create({
      key: `assassin-black-jump-down`,
      frames: scene.anims.generateFrameNumbers(`assassin-black`, {
        frames: [25, 28],
      }),
      frameRate: 5,
      repeat: 0,
    });
    scene.anims.create({
      key: `assassin-black-jump-right`,
      frames: scene.anims.generateFrameNumbers(`assassin-black`, {
        frames: [25 + 29 * 2, 28 + 29 * 2],
      }),
      frameRate: 5,
      repeat: 0,
    });
    scene.anims.create({
      key: `assassin-black-jump-up`,
      frames: scene.anims.generateFrameNumbers(`assassin-black`, {
        frames: [25 + 29 * 4, 28 + 29 * 4],
      }),
      frameRate: 5,
      repeat: 0,
    });
    scene.anims.create({
      key: `assassin-black-jump-left`,
      frames: scene.anims.generateFrameNumbers(`assassin-black`, {
        frames: [25 + 29 * 6, 28 + 29 * 6],
      }),
      frameRate: 5,
      repeat: 0,
    });
  }
}

export default AnimationManager;
