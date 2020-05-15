import {
  chooseJumplablePlatforms,
  PlayerMovement,
  createPlatforms,
  positionPlatforms,
  warpPlayer,
  gameController,
} from '../src/packages/gameController';
import scene from './mocks/scene';

const player = (() => {
  let y = 100;
  let finalThrust = {};

  const thrustLeft = (newThrust) => {
    finalThrust = { force: newThrust, direction: 'left' };
  };
  const thrust = (newThrust) => {
    finalThrust = { force: newThrust, direction: 'front' };
  };
  const thrustBack = (newThrust) => {
    finalThrust = { force: newThrust, direction: 'back' };
  };

  return {
    get y() { return y; },
    set y(newY) { y = newY; },
    thrustLeft,
    thrust,
    thrustBack,
    get finalThrust() { return finalThrust; },
  };
})();

describe('gameController functions: (phaser takes ↑ as -y and ↓ as +y what?)', () => {
  describe('chooseJumplablePlatforms | compares platforms with the height of the player', () => {
    test('platforms below are jumpable', () => {
      const plats = [
        { y: 150, collisionCategory: '' },
      ];
      chooseJumplablePlatforms(scene, plats, player);
      expect(plats[0].collisionCategory).toEqual('jumpable');
    });
    test('platforms above are not jumpable', () => {
      const plats = [
        { y: 0, collisionCategory: '' },
      ];
      chooseJumplablePlatforms(scene, plats, player);
      expect(plats[0].collisionCategory).toEqual('notJumpable');
    });
  });
  describe('PlayerMovement | checks if the player must move in that frame', () => {
    test('if the trigger is true thrust the player 1.5 to the left', () => {
      const trigger = true;
      const curs = {
        right: {
          isDown: false,
        },
        left: {
          isDown: false,
        },
      };
      PlayerMovement(trigger, player, curs);
      expect(player.finalThrust).toEqual({ force: 1.5, direction: 'left' });
    });
    test('if the right key is pressed thrust the player 0.05 in front', () => {
      const trigger = false;
      const curs = {
        right: {
          isDown: true,
        },
        left: {
          isDown: false,
        },
      };
      PlayerMovement(trigger, player, curs);
      expect(player.finalThrust).toEqual({ force: 0.05, direction: 'front' });
    });
    test('if the left key is pressed thrust the player 0.05 backwards', () => {
      const trigger = false;
      const curs = {
        right: {
          isDown: false,
        },
        left: {
          isDown: true,
        },
      };
      PlayerMovement(trigger, player, curs);
      expect(player.finalThrust).toEqual({ force: 0.05, direction: 'back' });
    });
  });
  test('createPlatforms | created the number given of platforms', () => {
    const plats = [];
    createPlatforms(5, scene, plats);

    expect(plats.length).toEqual(5);
  });
  describe('positionPlatforms | sets a position for the platforms based on the configs', () => {
    test('random gives them random locations inside of the canvas', () => {
      let position;
      const plats = [
        {
          create: (x, y) => { position = { x, y }; },
          setTint: () => { },
        },
      ];
      positionPlatforms({ style: 'random' }, plats);

      const correctX = position.x >= 0 && position.x <= 421;
      const correctY = position.y >= 0 && position.y <= 750;

      expect(correctX && correctY).toEqual(true);
    });
    test('linear sets the same height and separates the plats by a gap', () => {
      const position = [];
      const plats = [
        {
          create: (x, y) => { position[0] = { x, y }; },
          setTint: () => { },
        },
        {
          create: (x, y) => { position[1] = { x, y }; },
          setTint: () => { },
        },
      ];
      positionPlatforms({ style: 'linear', height: 200, gap: 5 }, plats);

      const positionsX = position[0].y === 200 && position[1].y === 200;
      const positionsY = position[0].x === 0 && position[1].x === 70;

      expect(positionsX && positionsY).toEqual(true);
    });
  });
  test('warpPlayer | if the player goes outside of the view, it wraps around', () => {
    const player = {
      x: 425,
    };
    warpPlayer(player);

    expect(player.x).toEqual(0);
  });
  describe('gameController | manages most of the game logic', () => {
    let gmController;
    test('calling the factory creates a function', () => {
      gmController = gameController(scene);
      expect(typeof gmController).toEqual('object');
    });
    describe('and then the controller can: ', () => {
      test('call preload', () => {
        expect(typeof gmController.preload).toEqual('function');
      });
      test('call create', () => {
        expect(typeof gmController.create).toEqual('function');
      });
      test('call update', () => {
        expect(typeof gmController.update).toEqual('function');
      });
    });
  });
});