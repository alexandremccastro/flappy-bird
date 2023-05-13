import Phaser from 'phaser'

export default class GameScene extends Phaser.Scene {
  private bird: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  private birdAngle = 0

  private cursor: Phaser.Types.Input.Keyboard.CursorKeys

  constructor() {
    super({ key: 'GameScene' })
  }

  preload() {
    this.load.image('sky', './assets/images/sky.png')
    this.load.image('pipe', './assets/images/pipe.png')
    this.load.spritesheet('bird', './assets/images/bird.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
  }

  create() {
    let sky = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'sky',
      'map'
    )

    let scaleX = this.cameras.main.width / sky.width
    let scaleY = this.cameras.main.height / sky.height
    let scale = Math.max(scaleX, scaleY)
    sky.setScale(scale).setScrollFactor(0)

    this.bird = this.physics.add.sprite(300, 300, 'bird')
    this.bird.setCollideWorldBounds(true)

    this.bird.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('bird', { start: 0, end: 0 }),
      frameRate: 10,
      repeat: 0,
    })

    this.bird.anims.create({
      key: 'fly',
      frames: this.anims.generateFrameNumbers('bird', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1,
    })

    this.bird.anims.play('fly')
    this.bird.setVelocityX(100)

    this.cursor = this.input.keyboard.createCursorKeys()

    this.cameras.main.startFollow(this.bird)
  }

  update() {
    if (this.cursor.up.isDown) {
      this.bird.setVelocityY(-300)
      this.birdAngle = -45
    }

    this.bird.angle = this.birdAngle

    if (this.birdAngle < 45) this.birdAngle += 0.25
  }
}
