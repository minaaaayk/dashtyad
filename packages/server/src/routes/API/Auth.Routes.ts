import { AuthController } from "../../controllers";
import { Application } from "express";
import { checkJwt, AuthValidations, privateHeaderValidation } from "../../middlewares";

export const AuthRouter = (app: Application) => {
  app.post("/login", AuthValidations.login, AuthController.login);
  app.post("/register",AuthValidations.register, AuthController.register);
  app.put(
    "/change-password",
    [privateHeaderValidation, AuthValidations.changePassword , checkJwt],
    AuthController.changePassword
  );
  app.post('/logout', [privateHeaderValidation, checkJwt], AuthController.logout);
};
