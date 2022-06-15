import { UserController } from "../../controllers";
import { Application } from "express";
import { checkJwt, checkRole } from "../../middlewares";
import { privateHeaderValidation, UserValidations } from "../../middlewares";
import { Role } from "../../models";

export const UserRouter = (app: Application) => {
  app.get(
    "/users",
    [privateHeaderValidation, checkJwt, checkRole([Role.Admin])],
    UserController.get_UsersList
  );
  app.post(
    "/user",
    [privateHeaderValidation, checkJwt, UserValidations.createUser, checkRole([Role.Admin])],
    UserController.create_User
  );
  app
  .route("/user/:id")
  .get([privateHeaderValidation, checkJwt, checkRole([Role.Admin])],UserController.get_User) 
  .put([privateHeaderValidation, checkJwt, UserValidations.updateUser ,checkRole([Role.Admin])], UserController.Update_User)
  .delete([privateHeaderValidation, checkJwt, checkRole([Role.Admin])], UserController.delete_User);
};
