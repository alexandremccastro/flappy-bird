import './assets/styles/index.css'
import Phaser from 'phaser'
import GameScene from './scenes/game.scene'

const config: Phaser.Types.Core.GameConfig = {
  parent: 'canvas',
  width: window.innerWidth,
  height: window.innerHeight,
  fps: {
    target: 30,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 300,
      },
      debug: true,
    },
  },
  backgroundColor: '#000',
  scene: [GameScene],
}

new Phaser.Game(config)
