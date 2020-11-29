import bodyParser from "body-parser";
import { UserController } from "../../controllers/User.Controller";
import { Application } from "express";

export const UserRouter = (app: Application) => {
  const Parser = bodyParser.json();
  app.route("/users").get(UserController.get_All_Users);
  app
    .route("/user")
    .get(UserController.get_One_User)
    .put(Parser, UserController.Update_One_User)
    .delete(Parser, UserController.delete_One_User);
};
