import { AuthController } from "../../controllers/Auth.Controller";
import { Application } from "express";

export const AuthRouter = (app: Application) => {
  app.route("/login").post(AuthController.login);
  app.route("/register").post( AuthController.register);
};
