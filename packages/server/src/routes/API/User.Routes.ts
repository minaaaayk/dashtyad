import { UserController } from "../../controllers/User.Controller";
import { Application } from "express";

export const UserRouter = (app: Application) => {
  app
    .route("/user")
    .get(UserController.get_One_User)
    .put(UserController.Update_One_User)
    .delete(UserController.delete_One_User);
};
