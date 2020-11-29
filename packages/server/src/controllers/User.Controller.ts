import { UserModel } from "./../models/User.Model";
import { IUser } from "./../Shared/interfaces/IUser";
import { Request, Response } from "express";

const login_post = (req: Request, res: Response) => {
  res.status(200).send({
    message: "GET login",
  });
};

const login_get = (req: Request, res: Response) => {
  res.status(200).send({
    message: "POST login",
  });
};

const register_get = (req: Request, res: Response) => {
  res.status(200).send({
    message: "GET register",
  });
};

const register_post = (req: Request, res: Response) => {
  if (req.query) {
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

export const UserController = {
  register_post,
  register_get,
  login_post,
  login_get,
};
