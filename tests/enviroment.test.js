import background from '../src/packages/enviroment';
import scene from './mocks/scene';

let bckg;
describe('Enviroment functions: ', () => {
  test('calling the factory creates a function', () => {
    bckg = background(scene);
    expect(typeof bckg).toEqual('object');
  });
  test('after calling the factory, the object is able to be created', () => {
    bckg = background(scene);
    expect(typeof bckg.create).toEqual('function');
  });
});