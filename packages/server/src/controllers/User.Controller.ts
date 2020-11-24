import { Request, Response } from "express";
import User, { IUser } from "../models/User.Model";

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
      gender,
    } = req.body as IUser;

    const user = User.create({
      email,
      password,
      firstName,
      lastName,
      username,
      gender,
    })
      .then((user: IUser) => {
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
