import { Request, Response } from "express";

const get_One_User = (req: Request, res: Response) => {
  res.status(200).send({
    message: "GET ONe User",
  });
};

const get_All_Users = (req: Request, res: Response) => {
  res.status(200).send({
    message: "GET All User",
  });
};

const delete_One_User = (req: Request, res: Response) => {
  res.status(200).send({
    message: "delete on User",
  });
};

const Update_One_User = (req: Request, res: Response) => {
  res.status(200).send({
    message: "update User",
  });
};

export const UserController = {
  get_One_User,
  get_All_Users,
  delete_One_User,
  Update_One_User,
};
