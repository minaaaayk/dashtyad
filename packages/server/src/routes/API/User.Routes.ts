import { UserController } from "../../controllers";
import { Application } from "express";
import { checkJwt, checkRole } from "../../middlewares";
import { Role } from "../../models";

export const UserRouter = (app: Application) => {
  app.get("/users", [checkJwt, checkRole([Role.Admin])], UserController.get_UsersList);
  app.post("/user", [checkJwt, checkRole([Role.Admin])],UserController.create_User);
  app
  .route("/user/:id")
  .get([checkJwt, checkRole([Role.Admin])],UserController.get_User) 
  .put([checkJwt, checkRole([Role.Admin])], UserController.Update_User)
  .delete([checkJwt, checkRole([Role.Admin])], UserController.delete_User);
};
