import { Request, Response, NextFunction } from "express";
import { IResponseType } from "../Shared";
import { UserModel } from "./../models";


export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Get the user ID from previous midleware
    const id = res.locals.jwtPayload.userId;

    //Get user role from the database
    let user = new UserModel();
    try {
      user = await UserModel.findById(id);
    } catch (id) {
      const badRequest: IResponseType = {
        message: 'user not found',
        status: 409,
        success: false,
      };
      res.status(badRequest.status).send(badRequest);
    }

    //Check if array of authorized roles includes the user's role
    if (roles.indexOf(user?.role) > -1) next();
    else {
      const unAuthorizedRequest: IResponseType = {
        message: 'unAuthorized user',
        status: 401,
        success: false,
      };
      res.status(unAuthorizedRequest.status).send(unAuthorizedRequest);
    }
  };
};
