import { User, UserModel, UserType } from "./../models/User.Model";
import { Request, Response } from "express";

const login = (req: Request, res: Response) => {
  res.status(200).send({
    message: "login",
  });
};


const register = (req: Request, res: Response) => {
  if (req.body) {
    try{
      
      const {
        email,
        password,
        firstName,
        lastName,
        username,
      } = req.body as UserType; 

      User.hashPassword(password).then((hashPass)=>{
        UserModel.create({
          email,
          password: hashPass,
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
      }).catch(err => {
        throw new Error(err)
      });
    }
    catch (error) {
      res.status(400).send({
        message: "Registration Problem",
        error,
      });
    }
  }
};

const changePassword = (req: Request, res: Response)=>{
  res.status(200).send({
    message: "change password",
  });
};

export const AuthController = {
  register,
  login,
  changePassword,
};
