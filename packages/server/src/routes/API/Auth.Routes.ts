import { AuthController } from "../../controllers/Auth.Controller";
import { Application } from "express";
import { checkJwt } from "../../middlewares/checkJwt";

export const AuthRouter = (app: Application) => {
  app.route("/login").post(AuthController.login);
  app.route("/register").post( AuthController.register);
  app.put("/change-password", [checkJwt], AuthController.changePassword);
  // app.post(
  // '/refresh-token',
  //    [validators.privateHeaderValidate, validators.refreshTokenValidate],
  //   auth.refreshTokenController,
  // );
  // app.post('/logout', validators.privateHeaderValidate, auth.logoutController);
};
