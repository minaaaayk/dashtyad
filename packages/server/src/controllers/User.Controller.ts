import { Request, Response } from "express";
import { IResponseType } from "../Shared";
import { User, UserModel, UserType } from "./../models";

const get_UsersList = async (req: Request, res: Response) => {
  try {

    const users: UserType[] = await UserModel.find();
    const usersListResponse: IResponseType = {
      message: '',
      status: 200,
      success: true,
      response: users,
    };
    
    res.status(usersListResponse.status);
    res.send(usersListResponse);
  } catch (error) {
     const response: IResponseType = {
      message: 'Internal Server Error ' + error.message,
      status: 501,
      success: false,
    };
    res.status(response.status);
    res.send(response);
  }
};

const get_User = async (req: Request, res: Response) => {
  //Get the ID from the url
  const id: number | string = req.params.id;
  try {
    const user = await UserModel.findById(id); 
    const userResponse: IResponseType = {
      message: '',
      status: 200,
      success: true,
      response: user,
    };
    
    res.status(userResponse.status);
    res.send(userResponse);
  } catch (error) {
     const response: IResponseType = {
      message: 'Internal Server Error ' + error.message,
      status: 501,
      success: false,
    };
    res.status(response.status);
    res.send(response);
  }
};

const create_User = async (req: Request, res: Response) => {
  try {
    const data = req.body as UserType;
    const {email, username, password } = data;


    const existUser = await UserModel.findOne({  username  }) 
                || await UserModel.findOne({  email  }); 
    if(existUser){
      throw (new Error('User already registered'));
    }
    // Generating Password Hash
    const hashedPassword =  await User.hashPassword(password);
    // Creating the user record ( DOCUMENT )
    const user = await UserModel.create({
        ...data,
        password: hashedPassword,
        createAt: new Date(),
    });
    const userResponse: IResponseType = {
      message: '',
      status: 200,
      success: true,
      response: user,
    };
    
    res.status(userResponse.status);
    res.send(userResponse);
  } catch (error) {
     const response: IResponseType = {
      message: 'Internal Server Error ' + error.message,
      status: 501,
      success: false,
    };
    res.status(response.status);
    res.send(response);
  }
};


const delete_User = async (req: Request, res: Response) => {
  try {
    //Get the ID from the url
    const id = req.params.id;
    const user = await UserModel.findById(id);
    if(!user){
      throw (new Error('User already registered'));
    }
    await user.delete();
    const deleteResponse: IResponseType = {
      message: 'delete user OK',
      status: 200,
      success: true,
    };
    
    res.status(deleteResponse.status);
    res.send(deleteResponse);

  } catch (error) {
    const response: IResponseType = {
      message: 'Internal Server Error ' + error.message,
      status: 501,
      success: false,
    };
    res.status(response.status);
    res.send(response);
  }
};

const Update_User =async (req: Request, res: Response) => {
  const id: number | string = req.params.id;
  try {
    const user = await UserModel.findById(id); 
    if (user) {
      const {username, email, gender, firstName, lastName, role} = req.body as UserType;
      const existUser = await UserModel.findOne({  username  }) 
                || await UserModel.findOne({  email  }); 
      if(existUser){
        throw (new Error('User already registered'));
      }
      user.username = username || user.username;
      user.email = email || user.email;
      user.gender = gender || user.gender;
      user.role = role || user.role;
      user.firstName = firstName ?? user.firstName;
      user.lastName = lastName ?? user.lastName;
      user.updateAt = new Date();
      await user.save();
      const userResponse: IResponseType = {
        message: '',
        status: 200,
        success: true,
        response: user,
      };
      
      res.status(userResponse.status);
      res.send(userResponse);
    } else {
      const notFound: IResponseType = {
        message: 'User not found.',
        status: 401,
        success: false,
      };
      res.status(notFound.status);
      res.send(notFound);
      return;
    }
  } catch (error) {
    const response: IResponseType = {
      message: 'Internal Server Error ' + error.message,
      status: 501,
      success: false,
    };
    res.status(response.status);
    res.send(response);
  }
};

export const UserController = {
  get_UsersList,
  get_User,
  create_User,
  Update_User,
  delete_User
};
