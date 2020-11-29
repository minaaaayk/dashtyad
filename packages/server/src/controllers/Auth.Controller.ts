import { UserModel } from "./../models/User.Model";
import { IUser } from "./../Shared/interfaces/IUser";
import { Request, Response } from "express";

const login = (req: Request, res: Response) => {
  res.status(200).send({
    message: "login",
  });
};

const register = (req: Request, res: Response) => {
  if (req.body) {
    const {
      email,
      password,
      firstName,
      lastName,
      username,
    } = req.body as IUser;

    UserModel.create({
      email,
      password,
      firstName,
      lastName,
      username,
      createAt: new Date(),
    })
      .then((user) => {
        res.status(200).send({
          message: "POST register  OK",
          user,
        });
      })
      .catch((error: Error) => {
        res.status(400).send({
          message: "POST register  Failed",
          error,
        });
      });
  }
};

export const AuthController = {
  register,
  login,
};
