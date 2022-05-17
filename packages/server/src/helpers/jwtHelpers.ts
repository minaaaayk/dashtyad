import jwt from 'jsonwebtoken';
import config from '../config/config';

interface IGenerateToken {
  userId: string;
  username: string;
}

const generateAccessToken = (user:IGenerateToken) => {
  return new Promise<string>((resolve, reject) => {
    const options: jwt.SignOptions = {
      expiresIn: '15m',
      issuer: 'some@company.in',
    };
    
    jwt.sign({ ...user }, config.ACCESS_TOKEN_SECRET!, options, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

const verifyAccessToken = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.ACCESS_TOKEN_SECRET!, (err, payload) => {
      if (err) {
        if (err.name === 'TokenExpiredError') resolve('expired');
        else reject(err);
      }
      resolve(payload);
    });
  });
};

const generateRefreshToken = (user:IGenerateToken) => {
  return new Promise<string>((resolve, reject) => {
    const options: jwt.SignOptions = {
      expiresIn: '1d',
      issuer: 'some@company.in',
    };
    jwt.sign(
      { ...user },
      config.REFRESH_TOKEN_SECRET!,
      options,
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      },
    );
  });
};

const verifyRefreshToken = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.REFRESH_TOKEN_SECRET!, (err, payload) => {
      if (err) {
        if (err.name === 'TokenExpiredError') resolve('expired');
        else reject(err);
      }
      resolve(payload);
    });
  });
};

export {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  verifyAccessToken,
};
