import Doodler from '../images/Doodler.png'

const player = (scene) => {
  let jumpable = 0x0002
  let notJumpable = 0x0004
  let playerBody;
  scene.load.image('Doodler', Doodler);

  const create = () => {
    playerBody = scene.matter.add.image(200, 0, 'Doodler', null);
    playerBody.setRectangle(30, 48, {
      mass: 30,
      collisionFilter: {
        mask: jumpable
      },
      render: {
        sprite: {
          xOffset: -0.15
        }
      }
    })
    playerBody.setFixedRotation(0)

  }
  const thrustLeft = (force) => {
    playerBody.thrustLeft(force)
  }
  const thrustBack = (force) => {
    playerBody.thrustBack(force)
  }
  const thrust = (force) => {
    playerBody.thrust(force)
  }

  return {
    create,
    thrustLeft,
    thrustBack,
    thrust,
    get x() { return playerBody.x },
    get y() { return playerBody.y },
    get scrollFactorY() { return playerBody.scrollFactorY }
  }
}

export { player }