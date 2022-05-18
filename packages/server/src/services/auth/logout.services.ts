import { jwtHelpers, redisHelpers } from '../../helpers';

interface ParamType {
  accessToken: any;
  refreshToken: any;
}
export const logoutUserService = async (tokens: ParamType): Promise<boolean> => {
  try {
    const accessPayload: any = await jwtHelpers.verifyAccessToken(tokens.accessToken); // expired expected
    
    if (accessPayload !== 'expired') {
      redisHelpers.DELETE(accessPayload.userId);
    } else {
      const refreshPayload: any = await jwtHelpers.verifyRefreshToken(tokens.refreshToken);
      if (refreshPayload !== 'expired') {
        redisHelpers.DELETE(refreshPayload.userId);
      } 
    }
    return true;
  } catch (err) {
    throw new Error(err);
  }
}
