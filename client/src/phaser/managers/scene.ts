import Phaser from "phaser";

class SceneManager {
  static instance: SceneManager;

  constructor() {
    if (SceneManager.instance) {
      return SceneManager.instance;
    }
    SceneManager.instance = this;
  }

  static getInstance() {
    if (!SceneManager.instance) {
      SceneManager.instance = new SceneManager();
    }
    return SceneManager.instance;
  }
}

export default SceneManager;
