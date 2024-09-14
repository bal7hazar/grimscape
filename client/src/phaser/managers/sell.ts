import GameManager from "./game";

class SellManager {
  static instance: SellManager;
  private gold: number = 1;
  private action: number = 1;
  private step: number = 1;

  constructor() {
    if (SellManager.instance) {
      return SellManager.instance;
    }
    SellManager.instance = this;
  }

  static getInstance() {
    if (!SellManager.instance) {
      SellManager.instance = new SellManager();
    }
    return SellManager.instance;
  }

  getGold() {
    return this.gold;
  }

  getAction() {
    return this.action;
  }

  getStep() {
    return this.step;
  }

  increase() {
    const action = GameManager.getInstance().game?.action || 0;
    if (this.action + this.step > action) return;
    this.action += this.step;
    this.gold += 1;
  }

  decrease() {
    if (this.action <= this.step) return;
    this.action -= this.step;
    this.gold -= 1;
  }

  canIncrease() {
    return (
      this.action + this.step <= (GameManager.getInstance().game?.action || 0)
    );
  }

  canDecrease() {
    return this.action > this.step;
  }

  canPerform() {
    const action = GameManager.getInstance().game?.action || 0;
    return this.gold > 0 && action >= this.action;
  }
}

export default SellManager;
