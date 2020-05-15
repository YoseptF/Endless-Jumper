import basicPlatform from '../src/packages/platforms';
import scene from './mocks/scene';

let plat;

describe('basicPlatform functions: ', () => {
  test('calling the factory creates a function', () => {
    plat = basicPlatform(scene);
    expect(typeof plat).toEqual('object');
  });
  describe('after calling the factory, the object is able to :', () => {
    test('be created', () => {
      plat = basicPlatform(scene);
      expect(typeof plat.create).toEqual('function');
    });
    test('be destroyed', () => {
      plat = basicPlatform(scene);
      expect(typeof plat.destroy).toEqual('function');
    });
    test('be added again', () => {
      plat = basicPlatform(scene);
      expect(typeof plat.addAgain).toEqual('function');
    });
  });
});