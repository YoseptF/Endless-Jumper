import sky from '../images/sky.png'

const background = (scene) => {
  let backgroundBody;
  scene.load.image('sky', sky);


  const create = () => {
    backgroundBody = scene.add.tileSprite(400, 300, 1920, 1080, 'sky');
    backgroundBody.setScrollFactor(0, 0);
  };

  return {
    create,
    set tilePositionX(newPos) { backgroundBody.tilePositionX = newPos; },
    set tilePositionY(newPos) { backgroundBody.tilePositionY = newPos; },
    get tilePositionY() { return backgroundBody.tilePositionY; },
  };
};

export { background }