import bodyParser from "body-parser";
import { UserController } from "../../controllers/User.Controller";
import { Application} from "express";

export const UserRouter = (app: Application) => {
  const Parser = bodyParser.json();
  app
    .route("/login")
    .get(UserController.login_get)
    .post(Parser, UserController.login_post);
  app
    .route("/register")
    .get(UserController.register_get)
    .post(Parser, UserController.register_post);
};
