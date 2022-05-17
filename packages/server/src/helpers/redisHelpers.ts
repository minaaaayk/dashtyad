
import redisClient from './redis/redisClientLoader';


const SET = async (key: string, value: string) => {
  const res = await redisClient.set(key, value);
  return new Promise((resolve, reject) =>
    res !== 'OK' ? reject(new Error('REDIS SET FAILED')) : resolve(res),
  );
};

const GET = async (key: string) => {
  try {
    const val = await redisClient.get(key);
    return new Promise((resolve) => resolve(val));
  } catch (err) {
    return new Promise((_, reject) => reject(new Error('REDIS GET ERROR')));
  }
};

const DELETE = async (key: string) => {
  const val = redisClient.del(key);
  return new Promise((resolve, reject) =>
    !val ? reject(new Error('REDIS DELETE FAILED')) : resolve(val),
  );
};

export { SET, GET, DELETE };
