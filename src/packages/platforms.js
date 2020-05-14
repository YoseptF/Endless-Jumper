import Phaser from 'phaser'
import platform from '../images/platform.png'

let oneNOne = true

const basicPlatform = (scene) => {
  let jumpable = 0x0002
  let notJumpable = 0x0004

  let basicPlatformBody;
  scene.load.image('platform', platform);

  const create = (x, y) => {
    basicPlatformBody = scene.matter.add.image(
      x,
      y,
      'platform',
      null,
      {
        isStatic: true,
        collisionFilter: {
          category: notJumpable,
        }
      });
  }

  const destroy = () => {
    scene.matter.world.remove(scene.matter.world, basicPlatformBody)
  }

  const addAgain = (camera) => {
    basicPlatformBody.setPosition(
      Phaser.Math.Between(0, 421),
      oneNOne ? Phaser.Math.Between(camera.scrollY, camera.scrollY - 300) : camera.scrollY
    )
    oneNOne = !oneNOne
  }

  const setTint = () => {
    basicPlatformBody.setTint(0xff0000)
  }

  return {
    create,
    destroy,
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