import GameManager from "./game";

class BuyManager {
  static instance: BuyManager;
  private gold: number = 5;
  private action: number = 1;
  private step: number = 5;

  constructor() {
    if (BuyManager.instance) {
      return BuyManager.instance;
    }
    BuyManager.instance = this;
  }

  static getInstance() {
    if (!BuyManager.instance) {
      BuyManager.instance = new BuyManager();
    }
    return BuyManager.instance;
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
    const gold = GameManager.getInstance().game?.gold || 0;
    if (this.gold + this.step > gold) return;
    this.gold += this.step;
    this.action += 1;
  }

  decrease() {
    if (this.gold <= this.step) return;
    this.gold -= this.step;
    this.action -= 1;
  }

  canIncrease() {
    return this.gold + this.step <= (GameManager.getInstance().game?.gold || 0);
  }

  canDecrease() {
    return this.gold > this.step;
  }

  canPerform() {
    const gold = GameManager.getInstance().game?.gold || 0;
    return this.action > 0 && gold >= this.gold;
  }
}

export default BuyManager;
