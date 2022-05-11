import { UserController } from "../../controllers/User.Controller";
import { Application } from "express";
import { checkJwt } from "../../middlewares/checkJwt";
import { checkRole } from "../../middlewares/checkRole";
import { Role } from "../../models/User.Model";

export const UserRouter = (app: Application) => {
  app.get("/users", [checkJwt, checkRole([Role.Admin])], UserController.get_All_Users);  
  app
  .route("/user/:id([0-9]+)")
    .get([checkJwt, checkRole([Role.Admin])],UserController.get_One_User) 
    .put([checkJwt, checkRole([Role.Admin])], UserController.Update_One_User)
    .delete([checkJwt, checkRole([Role.Admin])], UserController.delete_One_User);
};
