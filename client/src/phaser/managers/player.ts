import { Player } from "@/dojo/game/models/player";

class PlayerManager {
  static instance: PlayerManager;
  public player: Player | null = null;
  public username: string = "Nafnlaust";
  public signup: (name: string) => void = (name) => {};

  constructor() {
    if (PlayerManager.instance) {
      return PlayerManager.instance;
    }
    PlayerManager.instance = this;
  }

  static getInstance() {
    if (!PlayerManager.instance) {
      PlayerManager.instance = new PlayerManager();
    }
    return PlayerManager.instance;
  }

  setUsername(username: string) {
    PlayerManager.instance.username = username;
  }

  setPlayer(player: Player | null) {
    PlayerManager.instance.player = player;
  }

  setSignup(action: (name: string) => void) {
    PlayerManager.instance.signup = action;
  }

  callSignup() {
    if (
      !PlayerManager.instance.signup ||
      !!PlayerManager.instance.player ||
      !PlayerManager.instance.username
    )
      return;
    PlayerManager.instance.signup(PlayerManager.instance.username);
  }
}

export default PlayerManager;
