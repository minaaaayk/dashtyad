import bcrypt from 'bcryptjs';
import { redisHelpers, jwtHelpers } from '../../helpers';

// Models
import {  UserModel, UserType } from "../../models";

// Types
interface LoginParamType {
  username: string;
  email: string;
  password: string;
}

interface LoginReturnType {
  found: boolean;
  authorized?: boolean;
  auth?: {
    accessToken: string;
    refreshToken: string;
    userId: string;
  };
  user?: UserType;
}

export const loginUserService = async (
  {username, email,password}: LoginParamType,
): Promise<LoginReturnType> => {
  try {
    const user = await UserModel.findOne({  username  }) 
              || await UserModel.findOne({  email  });
    if (!user) {
      return { found: false };
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return { found: true, authorized: false };
    }

    // Generating access & refresh token ( JWT )
    const accessToken = await jwtHelpers.generateAccessToken({userId: user.id, username: username || email });
    const refreshToken = await jwtHelpers.generateRefreshToken({userId: user.id, username: username || email });
    
    // Saving refreshToken in redisDB
    await redisHelpers.SET(user!.id, refreshToken);
    return {
      found: true,
      authorized: true,
      auth: {
        userId: user.id,
        accessToken,
        refreshToken,
      },
      user,
    };
  } catch (err) {
    throw new Error(err);
  }
};
