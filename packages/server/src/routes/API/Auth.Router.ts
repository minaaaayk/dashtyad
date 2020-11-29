import bodyParser from "body-parser";
import { AuthController } from "../../controllers/Auth.Controller";
import { Application } from "express";

export const UserRouter = (app: Application) => {
  const Parser = bodyParser.json();
  app.route("/login").post(Parser, AuthController.login);
  app.route("/register").post(Parser, AuthController.register);
};
