import { NoteController } from "./../../controllers/Note.Controller";
import { Application } from "express";

export const NoteRouter = (app: Application) => {
  app.route("/notes").get(NoteController.get_All_Notes);
  app
    .route("/note")
    .get(NoteController.get_A_Note)
    .post(NoteController.Create_Note)
    .put(NoteController.Update_Note)
    .delete(NoteController.Delete_Note);
};
