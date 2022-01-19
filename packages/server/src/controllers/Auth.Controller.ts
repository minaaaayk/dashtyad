import { User, UserModel, UserType } from "./../models/User.Model";
import { request, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

const login = (req: Request, res: Response) => {

   if (req.body) {
    try{
      const {
        password,
        username,
      } = req.body as UserType; 

      User.findByCredentials({ password ,username })
      .then((user) => {
          //Sing JWT, valid for 1 hour
        const token = jwt.sign(
          { userId: user.id, username: user.username },
          config.jwtSecret,
          { expiresIn: "1h" }
        );

        res.setHeader("token", token);
        res.status(200)
        .send({
          message: "login  OK",
          user,
          token,
        });
      })
      .catch((error: Error) => {
        res.status(409).send({
          message: "login  Failed",
          error,
        });
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
           //Sing JWT, valid for 1 hour
          const token = jwt.sign(
            { userId: user.id, username: user.username },
            config.jwtSecret,
            { expiresIn: "1h" }
          );

          res.setHeader("token", token);
          res.status(200)
          .send({
            message: "register  OK",
            user,
            token,
          });
        })
        .catch((error: Error) => {
          res.status(409).send({
            message: "register  Failed",
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
