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
        message: "login Problem",
        error,
      });
    }
  }
};


const register = (req: Request, res: Response) => {
  if (req.body) {
    try{
      console.log('reg: ', req.body);
      
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
  if (req.body) {

    // TODO: need to fix
    try{
      const {
        oldPassword, newPassword
      } = req.body; 

      //Get ID from JWT
      const id = res.locals.jwtPayload.userId;
      console.log("id: ", id);
      
      UserModel.findOne(id)
      .then((user) => {
        res.status(200)
        .send({
          message: "pass  OK",
          user,
        });
      })
      .catch((error: Error) => {
        res.status(409).send({
          message: "user not found",
          error,
        });
      });
    }
    catch (error) {
      res.status(400).send({
        message: "changing password problem",
        error,
      });
    }
  }
};

export const AuthController = {
  register,
  login,
  changePassword,
};
