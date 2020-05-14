import Doodler from '../images/Doodler.png'

const player = (scene) => {
  let jumpable = 0x0002
  let notJumpable = 0x0004
  let playerBody;
  scene.load.image('Doodler', Doodler);

  const create = () => {
    playerBody = scene.matter.add.image(200, 50, 'Doodler', null);
    playerBody.setRectangle(30, 48, {
      mass: 30,
      frictionAir: 0.01,
      collisionFilter: {
        mask: jumpable
      },
      render: {
        sprite: {
          xOffset: -0.15
        }
      }
    })
    console.log(playerBody);
    playerBody.setFixedRotation(0)

  }

  const destroy = () => {
    playerBody.destroy()
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
  const setVelocityX = (x,y) => {
    playerBody.setVelocityX(x,y)
  }

  return {
    create,
    destroy,
    setVelocityX,
    thrustLeft,
    thrustBack,
    thrust,
    get x() { return playerBody.x },
    get y() { return playerBody.y },
    set x(newX) { playerBody.x = newX },
    set y(newY) { playerBody.y = newY },
    get scrollFactorY() { return playerBody.scrollFactorY },
    get velocity() { return playerBody.body.velocity }
  }
}

export { player }