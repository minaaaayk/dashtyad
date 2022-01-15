import { Request, Response, NextFunction } from "express";
import { UserModel } from "./../models/User.Model";


export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Get the user ID from previous midleware
    const id = res.locals.jwtPayload.userId;

    //Get user role from the database
    let user = new UserModel();
    try {
      user = await UserModel.findById(id);
    } catch (id) {
      res.status(401).send();
    }

    //Check if array of authorized roles includes the user's role
    if (roles.indexOf(user?.role) > -1) next();
    else res.status(401).send();
  };
};
