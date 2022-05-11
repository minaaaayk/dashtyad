import { UserController } from "../../controllers";
import { Application } from "express";
import { checkJwt, checkRole } from "../../middlewares";
import { Role } from "../../models";

export const UserRouter = (app: Application) => {
  app.get("/users", [checkJwt, checkRole([Role.Admin])], UserController.get_All_Users);  
  app
  .route("/user/:id([0-9]+)")
    .get([checkJwt, checkRole([Role.Admin])],UserController.get_One_User) 
    .put([checkJwt, checkRole([Role.Admin])], UserController.Update_One_User)
    .delete([checkJwt, checkRole([Role.Admin])], UserController.delete_One_User);
};
