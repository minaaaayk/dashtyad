import { NoteRouter } from "./API/Note.Routes";
import { NoteBookRouter } from "./API/NoteBook.Routes";
import { Application, Request, Response } from "express";
import { UserRouter } from "./API/User.Routes";

export const router = (app: Application) => {
  // CrmRouter(app);
  UserRouter(app);
  NoteBookRouter(app);
  NoteRouter(app);

  app.route("/").get((req: Request, res: Response) => {
    res.status(200).send({
      message: "root",
    });
  });
};
