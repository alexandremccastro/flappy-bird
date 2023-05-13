import Phaser from 'phaser'

export default class GameScene extends Phaser.Scene {
  private bird: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  private birdAngle = 0

  private cursor: Phaser.Types.Input.Keyboard.CursorKeys

  private pipes: Phaser.Physics.Arcade.Group

  constructor() {
    super({ key: 'GameScene' })
  }

  public preload() {
    this.load.image('sky', './assets/images/sky.png')
    this.load.image('pipe', './assets/images/pipe.png')
    this.load.spritesheet('bird', './assets/images/bird.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
  }

  public create() {
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

    let start = 400

    this.pipes = this.physics.add.group()

    for (let i = 0; i <= 4; i++) {
      const space = Phaser.Math.Between(200, 400)

      const topPipe = this.add
        .image(start, space, 'pipe')
        .setOrigin(0, 1)
        .setScale(2)

      const bottomPipe = this.add
        .image(start, topPipe.y + 100, 'pipe')
        .setOrigin(0)
        .setScale(2)

      start += 500
      bottomPipe.setAlpha(0.5)
      this.pipes.add(topPipe)
      this.pipes.add(bottomPipe)
    }

    this.bird = this.physics.add.sprite(
      200,
      this.cameras.main.height / 2,
      'bird'
    )
    this.bird.setCollideWorldBounds(true)
    this.bird.setGravityY(300)

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

    this.cursor = this.input.keyboard.createCursorKeys()

    // this.cameras.main.startFollow(this.bird)
    this.pipes.setVelocityX(-300)
  }

  public update() {
    if (this.cursor.up.isDown) {
      this.bird.setVelocityY(-200)
      this.birdAngle = -30
    }

    this.bird.angle = this.birdAngle

    if (this.birdAngle < 30) this.birdAngle += 0.15

    this.recyclePipes()
  }

  private getRightMostPipeX() {
    let rightMostX = 0

    this.pipes.getChildren().forEach((pipe) => {
      rightMostX = Math.max(pipe.body.position.x, rightMostX)
    })

    return rightMostX
  }

  private recyclePipes() {
    let recycledPipes: Phaser.GameObjects.Image[] = []

    this.pipes.getChildren().forEach((pipe) => {
      if (pipe.body.position.x < -200) {
        recycledPipes.push(pipe as Phaser.GameObjects.Image)

        if (recycledPipes.length == 2) {
          this.placePipes(recycledPipes[0], recycledPipes[1])
          recycledPipes = []
        }
      }
    })
  }

  private placePipes(
    topPipe: Phaser.GameObjects.Image,
    bottomPipe: Phaser.GameObjects.Image
  ) {
    const rightMostX = this.getRightMostPipeX()
    const space = Phaser.Math.Between(200, 500)

    topPipe.setY(space)
    bottomPipe.setY(topPipe.y + 100)
    topPipe.body.position.x = rightMostX + 500
    bottomPipe.body.position.x = rightMostX + 500
  }
}
