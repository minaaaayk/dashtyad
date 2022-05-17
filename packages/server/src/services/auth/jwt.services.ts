import { jwtHelpers, redisHelpers } from '../../helpers';

interface ParamType {
  refreshToken: any;
  accessToken: any;
}

interface PromiseType {
  tokens?: {
    accessToken: string;
    refreshToken: string;
  };
  user?: {
    userId: string,
    username: string,
  },
  match?: boolean;
  expired?: boolean;
}



//We want to send a new token on every request
//The access-token is valid for 15 minutes
//The refresh-token is valid for 1 day
const reGenerateTokens = async (userId, username) =>{
  // Generating new pair of tokens
    const newAccessToken = await jwtHelpers.generateAccessToken({userId, username });
    const newRefreshToken = await jwtHelpers.generateRefreshToken({userId, username });
    // Update value in redis
    await redisHelpers.SET(userId, newRefreshToken);
    return {
      tokens: { refreshToken: newRefreshToken, accessToken: newAccessToken },
      user: {userId, username},
      match: true,
    };
}

export const jwtServices = async ({
  accessToken,
  refreshToken,
}: ParamType): Promise<PromiseType> => {
  try {

    const accessPayload: any = await jwtHelpers.verifyAccessToken(accessToken); // expired expected
    
    if (accessPayload !== 'expired') {
      return (await reGenerateTokens(accessPayload.userId, accessPayload.username));
    } else {
      
      const refreshPayload: any = await jwtHelpers.verifyRefreshToken(refreshToken);
      if (refreshPayload !== 'expired') {

        //   Getting previous saved token
        const prevRefreshToken = await redisHelpers.GET(refreshPayload.userId);
        if (prevRefreshToken !== refreshToken) return { match: false };

        return (await reGenerateTokens(refreshPayload.userId, refreshPayload.username));
      } 
      return { expired: true };
    }
  } catch (err) {
    throw new Error(err);
  }
};

