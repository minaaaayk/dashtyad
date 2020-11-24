import { Application, Request, Response } from "express";
import { CrmRouter } from "./API/Crm.Routes";
import { UserRouter } from "./API/User.Routes";

export const router = (app: Application) => {
  app.route("/").get((req: Request, res: Response) => {
    res.status(200).send({
      message: "root",
    });
  });

  CrmRouter(app);
  UserRouter(app);
};
