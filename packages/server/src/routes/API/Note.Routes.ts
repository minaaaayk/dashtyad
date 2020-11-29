import { NoteController } from "./../../controllers/Note.Controller";
import bodyParser from "body-parser";
import { Application } from "express";

export const NoteRouter = (app: Application) => {
  const Parser = bodyParser.json();
  app.route("/notes").get(Parser, NoteController.get_All_Notes);
  app
    .route("/user")
    .get(Parser, NoteController.get_A_Note)
    .post(Parser, NoteController.Create_Note)
    .put(Parser, NoteController.Update_Note)
    .delete(Parser, NoteController.Delete_Note);
};
