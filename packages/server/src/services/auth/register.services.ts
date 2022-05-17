// Models
import {UserModel, UserType, User } from '../../models';

// Helpers
import { redisHelpers, jwtHelpers } from '../../helpers';

interface RegisterPromiseType {
  accessToken: string;
  refreshToken: string;
  user: UserType;
}

export const registerUserService = async (
  data: UserType,
): Promise<RegisterPromiseType> => {
  try {
    const { firstName,lastName,  email, username, password } = data;

    // Generating Password Hash
    const hashedPassword =  await User.hashPassword(password);
    // Creating the user record ( DOCUMENT )
    const user = await UserModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            username,
            createAt: new Date(),
        });

    // Generating access & refresh token ( JWT )
    const accessToken = /* 15 second */
        await jwtHelpers.generateAccessToken({ userId: user.id, username: user.username });
    const refreshToken = /* 1 day */
        await jwtHelpers.generateRefreshToken({ userId: user.id, username: user.username });

    // Saving refreshToken in redisDB
    await redisHelpers.SET(user.id, refreshToken);

    return { accessToken, refreshToken, user };
  } catch (err) {
    throw new Error(err);
  }
};


