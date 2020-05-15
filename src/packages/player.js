import Doodler from '../images/Doodler.png';

const player = (scene) => {
  const jumpable = 0x0002;
  let playerBody;
  scene.load.image('Doodler', Doodler);

  const create = (x, y) => {
    playerBody = scene.matter.add.image(x, y, 'Doodler', null);
    playerBody.setRectangle(30, 48, {
      mass: 30,
      frictionAir: 0.01,
      collisionFilter: {
        mask: jumpable,
      },
      render: {
        sprite: {
          xOffset: -0.15,
        },
      },
    });
    playerBody.setFixedRotation(0);
  };

  const destroy = () => {
    playerBody.destroy();
  };

  const thrustLeft = (force) => {
    playerBody.thrustLeft(force);
  };
  const thrustBack = (force) => {
    playerBody.thrustBack(force);
  };
  const thrust = (force) => {
    playerBody.thrust(force);
  };
  const setVelocityX = (x) => {
    playerBody.setVelocityX(x);
  };
  const setVelocityY = (y) => {
    playerBody.setVelocityY(y);
  };

  return {
    create,
    destroy,
    setVelocityX,
    setVelocityY,
    thrustLeft,
    thrustBack,
    thrust,
    get x() { return playerBody.x; },
    get y() { return playerBody.y; },
    set x(newX) { playerBody.x = newX; },
    set y(newY) { playerBody.y = newY; },
    get scrollFactorY() { return playerBody.scrollFactorY; },
    get velocity() { return playerBody.body.velocity; },
  };
};

export default player;