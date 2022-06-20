
import redisClient from './redis/redisClientLoader';


const SET = async (key: string, value: string) => {
  try{
    const res = await redisClient.set(key, value);
    return new Promise((resolve) => resolve(res) );
  } catch(e) {  
    return new Promise((_, reject) => reject(new Error('REDIS SET FAILED')));
  }
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
   try{
    const val = redisClient.del(key);
    return new Promise((resolve) => resolve(val));
  } catch(e) {  
    return new Promise((_, reject) => reject(new Error('REDIS DELETE FAILED')));
  }
};

export { SET, GET, DELETE };
