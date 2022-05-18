import { User, UserModel, UserType } from "./../models";
import {registerUserService} from "../services"
import { Request, Response } from "express";
import { jwtHelpers, redisHelpers } from "../helpers";
import { IResponseType } from "../Shared";

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
        const successReq: IResponseType = {
            message: 'change password successfully',
            status: 200,
            success: true,
            response: user,
            auth: {
              userId: user.id,
              refreshToken,
              accessToken,
            }
        };
        res.status(successReq.status);
        res.send(successReq);
      } catch (error) {
        const notFoundResponse: IResponseType = {
          message: 'user not found',
          status: 409,
          success: false,
        };
        res.status(notFoundResponse.status).send(notFoundResponse);
      }
    }
    catch (error) {
      const response: IResponseType = {
        message: 'Internal Server Error.',
        status: 501,
        success: false,
      };
      res.status(response.status);
      res.send(response);
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
        const successReq: IResponseType = {
            message: 'register  OK',
            status: 200,
            success: true,
            response: user,
            auth: {
              userId: user.id,
              refreshToken,
              accessToken,
            }
          };
        res.status(successReq.status);
        res.send(successReq);
        return;
      } catch (error) {
        const notFoundResponse: IResponseType = {
          message: 'user not found',
          status: 409,
          success: false,
        };
        res.status(notFoundResponse.status).send(notFoundResponse);
      }
    }
    catch (error) {
      const response: IResponseType = {
        message: 'Internal Server Error.',
        status: 501,
        success: false,
      };
      res.status(response.status);
      res.send(response);
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
          const badRequest: IResponseType = {
            message: 'password is not matched',
            status: 401,
            success: false,
          };
          res.status(badRequest.status);
          res.send(badRequest);
          return;
        }
        const hashedPassword = await User.hashPassword(newPassword);
        user.password = hashedPassword;
        user.save();
        const successReq: IResponseType = {
            message: 'change password successfully',
            status: 201,
            success: true,
            response: user,
        };
        res.status(successReq.status);
        res.send(successReq);
      } catch (error) {
        const notFoundResponse: IResponseType = {
          message: 'user not found',
          status: 409,
          success: false,
        };
        res.status(notFoundResponse.status).send(notFoundResponse);
      }
    }
    catch (error) {
      const response: IResponseType = {
        message: 'Internal Server Error.',
        status: 501,
        success: false,
      };
      res.status(response.status);
      res.send(response);
    }
  }
};

export const AuthController = {
  register,
  login,
  changePassword,
};
