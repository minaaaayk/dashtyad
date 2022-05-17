import { User, UserModel, UserType } from "./../models";
import {registerUserService} from "../services"
import { Request, Response } from "express";
import { jwtHelpers, redisHelpers } from "../helpers";

const login = async (req: Request, res: Response) => {

  
   if (req.body) {
    try{
      const {
        password,
        email,
        username,
      } = req.body as UserType; 

      try {
        const user = await User.findByCredentials({ password ,username, email });
        //Sing JWT, valid for 1 hour
       // Generating access & refresh token ( JWT )
       const accessToken = await jwtHelpers.generateAccessToken({userId: user.id, username: username || email });
       const refreshToken = await jwtHelpers.generateRefreshToken({userId: user.id, username: username || email });
       
       // Saving refreshToken in redisDB
       
       await redisHelpers.SET(user.id, refreshToken);
        res.setHeader("refresh-token", refreshToken);
        res.setHeader("access-token", accessToken);

        res.status(200)
        .send({
          message: "login  OK",
          user,
          accessToken,
          refreshToken,
        });

      } catch (error) {
        res.status(409).send({
          message: "login  Failed",
          error,
        });
      }
    }
    catch (error) {
      res.status(400).send({
        message: "invalid Arguments",
        error,
      });
    }
  }
};


const register = async (req: Request, res: Response) => {
  if (req.body) {
    try{
      const { email, username } = req.body as UserType;
      
      try {
        const existUser = await UserModel.findOne({  username  }) 
                || await UserModel.findOne({  email  }); 
        if(existUser){
          throw (new Error('User already registered'));
        }
        const {
            accessToken,
            user,
            refreshToken,
          } = await registerUserService(req.body);
          res.setHeader("refresh-token", refreshToken);
          res.setHeader("access-token", accessToken);
          res.status(200)
          .send({
            message: "register  OK",
            user,
            accessToken,
            refreshToken,
          });
          return;
      } catch (error) {
        res.status(409).send({
            message: "register  Failed",
            error: error.message,
          });
      }
    }
    catch (error) {
      res.status(400).send({
        message: "Invalid arguments",
        error,
      });
    }
  }
};

const changePassword = async (req: Request, res: Response)=>{
  if (req.body) {

    // TODO: need to fix
    try{
      const {
        oldPassword, newPassword
      } = req.body; 

      //Get ID from JWT
      const id = res.locals.jwtPayload.userId;
      try {
        const user = await UserModel.findOne({ _id : id});
        //Check if old password matchs
        const matched = await User.checkPassword({
          unEncryptedPassword: oldPassword,
          encryptedPassword: user.password
        });
        if (!matched) {
          res.status(401).send({
            message: 'password is not matched',
          });
          return;
        }
        const hashedPassword = await User.hashPassword(newPassword);
        user.password = hashedPassword;
        user.save();
        res.status(200)
        .send({
          message: "pass  OK",
          user,
        });
        
      } catch (error) {
        res.status(409).send({
          message: "user not found",
          error,
        });
      }
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
