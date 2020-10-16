import * as RedisService from '../../src/services/redis_service';
import { promisify } from 'util';

afterEach(() => promisify(RedisService.client.flushall).call(RedisService.client));
afterAll(() => promisify(RedisService.client.quit).call(RedisService.client));

describe('Redis Service', () => {
  afterAll(() => RedisService.client.quit());

  test('set wrapper should return promise', () => {
    const setPromise = RedisService.set('test', 'testValue', 12);
    expect(setPromise).resolves.toStrictEqual(true);
  });

  test('set wrapper should not set expiration time if no exp. argument is passed', () => {
    const setPromise = RedisService.set('test2', 'testValue2');
    return expect(setPromise).resolves.toStrictEqual(true);
  });

  test('get wrapper should resolve to value if key exists', async () => {
    await RedisService.set('test', 'testValue', 12);
    const getPromise = RedisService.get('test');
    return expect(getPromise).resolves.toStrictEqual('testValue');
  });

  test('get wrapper should resolve to null if key does not exists', () => {
    const value = RedisService.get('nonExistingKey');
    return expect(value).resolves.toBe(null);
  });

  test('getOrSet should resolve to value if key exists without calling set', async () => {
    const cb = jest.fn(() => Promise.resolve('overwriten value'));
    const key = 'test';
    await RedisService.set('test', 'testValue', 12);
    const getOrSetPromise = RedisService.getOrSet(key, cb, 12);
    return expect(getOrSetPromise).resolves.toStrictEqual('testValue');
  });

  test('getOrSet should set key if does not exist and resolve to value', () => {
    const newValue = 'newValue';
    const cb = jest.fn(() => Promise.resolve(newValue));
    const key = 'nonExistingKey';
    const getOrSetPromise = RedisService.getOrSet(key, cb, 12);
    return expect(getOrSetPromise).resolves.toStrictEqual(newValue);
  });

  test('getOrSet should not set expire time if no argument is passed', () => {
    const newValue = 'newValue';
    const cb = jest.fn(() => Promise.resolve(newValue));
    const key = 'nonExistingKey';
    const getOrSetPromise = RedisService.getOrSet(key, cb);
    return expect(getOrSetPromise).resolves.toStrictEqual(newValue);
  });
});
