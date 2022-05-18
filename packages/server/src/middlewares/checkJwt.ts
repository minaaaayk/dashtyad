import { Request, Response, NextFunction } from "express";
import { IResponseType } from "../Shared";
import { jwtServices } from "../services";

export const checkJwt = async (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  const data = {
    refreshToken: req.headers['refresh-token'],
    accessToken: req.headers['access-token'],
  };
  //Try to validate the token and get data
  try {
    const { expired, match, tokens , user } =  await jwtServices(data);
    if (expired) {
      const expiredResponse: IResponseType = {
        message: 'Please log in again',
        status: 405,
        success: false,
      };
      res.status(expiredResponse.status);
      res.send(expiredResponse);
      return;
    }
      //If token is not valid, respond with 401 (unauthorized)
    if (!match) {
      const badRequest: IResponseType = {
        message: 'Invalid Token',
        status: 401,
        success: false,
      };
      res.status(badRequest.status);
      res.send(badRequest);
      return;
    } 
    res.setHeader("refresh-token", tokens.refreshToken);
    res.setHeader("access-token", tokens.accessToken);
    res.locals.jwtPayload = {...tokens, ...user};

  } catch (err) {
    const response: IResponseType = {
      message: 'Internal Server Error.',
      status: 501,
      success: false,
    };

    res.status(response.status);
    res.send(response);
  }
  //Call the next middleware or controller
  next();
};
