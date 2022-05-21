import { Request, Response, NextFunction } from "express";
import { IResponseType } from "../Shared";
import { Role, UserModel } from "./../models";


export const checkRole = (roles: Array<Role>) => {
  return async (req: Request, res: Response, next: NextFunction) => {

    //Get the user ID from previous midleware
    const id = res.locals.jwtPayload.userId;

    //Get user role from the database
    let user = new UserModel();
    try {
      user = await UserModel.findById(id);
    } catch (error) {
      const badRequest: IResponseType = {
        message: 'user not found ' + error.message,
        status: 409,
        success: false,
      };
      res.status(badRequest.status).send(badRequest);
      
      return;
    }
    //Check if array of authorized roles includes the user's role
    if (roles.indexOf(user?.role) > -1) {
      //Call the next middleware or controller
      next();
      return;
    }
    else {
      const unAuthorizedRequest: IResponseType = {
        message: 'unAuthorized user',
        status: 401,
        success: false,
      };
      res.status(unAuthorizedRequest.status).send(unAuthorizedRequest);
      return;
    }
  };
};
