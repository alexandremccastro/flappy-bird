import "./index.css";

import Phaser from "phaser";
import GameScene from "./scenes/game.scene";

/**
 * @type {Phaser.Types.Core.GameConfig}
 */
const config = {
  parent: "canvas",
  width: 1920,
  height: 1080,
  fps: {
    target: 60,
  },
  backgroundColor: "#000",
  scene: [GameScene],
};

const game = new Phaser.Game();
