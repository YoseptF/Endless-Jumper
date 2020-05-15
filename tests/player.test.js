import scene from './mocks/scene';
import player from '../src/packages/player';

let plyr;

describe('player functions: ', () => {
  test('calling the factory creates a function', () => {
    plyr = player(scene);
    expect(typeof plyr).toEqual('object');
  });
  describe('after calling the factory, the object is able to: ', () => {
    test(' be created', () => {
      plyr = player(scene);
      expect(typeof plyr.create).toEqual('function');
    });
    test('be destroyed', () => {
      plyr = player(scene);
      expect(typeof plyr.destroy).toEqual('function');
    });
    test('thrustLeft', () => {
      plyr = player(scene);
      expect(typeof plyr.thrustLeft).toEqual('function');
    });
    test('thrustBack', () => {
      plyr = player(scene);
      expect(typeof plyr.thrustBack).toEqual('function');
    });
    test('thrust', () => {
      plyr = player(scene);
      expect(typeof plyr.thrust).toEqual('function');
    });
    test('setVelocityX', () => {
      plyr = player(scene);
      expect(typeof plyr.setVelocityX).toEqual('function');
    });
    test('setVelocityY', () => {
      plyr = player(scene);
      expect(typeof plyr.setVelocityY).toEqual('function');
    });
  });
});