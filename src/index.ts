import './assets/styles/index.css'
import Phaser from 'phaser'
import GameScene from './scenes/game.scene'

const config: Phaser.Types.Core.GameConfig = {
  parent: 'canvas',
  width: 800,
  height: 600,
  fps: {
    target: 60,
  },
  physics: {
    default: 'arcade',
  },
  backgroundColor: '#000',
  scene: [GameScene],
}

new Phaser.Game(config)
