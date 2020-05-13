import Phaser from 'phaser'
import platform from '../images/platform.png'

const basicPlatform = (scene) => {
  let jumpable = 0x0002
  let notJumpable = 0x0004

  let basicPlatformBody;
  scene.load.image('platform', platform);

  const create = () => {
    basicPlatformBody = scene.matter.add.image(45, 480, 'platform', null, {
      isStatic: true,
      collisionFilter: {
        category: notJumpable,
      }
    });
    basicPlatformBody.setRandomPosition()
  }

  const addAgain = (camera) => {
    basicPlatformBody.setPosition(
      Phaser.Math.Between(camera.x, camera.x + 400),
      Phaser.Math.Between(camera.y + camera.scrollY, camera.y + camera.scrollY + 50)
    )
  }

  const setTint = () => {
    basicPlatformBody.setTint(0xff0000)
  }

  return {
    create,
    setTint,
    get x() { return basicPlatformBody.x },
    get y() { return basicPlatformBody.y },
    set collisionCategory(cat) {
      if (cat === 'jumpable')
        basicPlatformBody.setCollisionCategory(jumpable)
      else
        basicPlatformBody.setCollisionCategory(notJumpable)
    },
    addAgain
  }
}

export { basicPlatform }