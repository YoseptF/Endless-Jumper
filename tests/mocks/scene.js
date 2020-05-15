const tileSprite = (() => {
  let scrollFactor;
  const tilePositionX = 0;
  const tilePositionY = 0;
  const setScrollFactor = (x, y) => {
    scrollFactor = { x, y };
  };

  return {
    tilePositionX,
    tilePositionY,
    setScrollFactor,
    scrollFactor,
  };
})();

const image = (key, path) => {
  const state = { key, path };

  return { state };
};

const scene = (() => {
  const cameras = {
    main: {
      worldView: {
        y: 0,
      },
    },
  };
  const add = {
    tileSprite,
  };
  const load = {
    image,
  };

  return { add, load, cameras };
})();

export default scene;