import { NoteController, NoteBookController } from "./../../controllers";
import { Application } from "express";

export const NoteBookRouter = (app: Application) => {
  app
    .route("/notebook")
    .get(NoteController.get_All_Notes)
    .post(NoteBookController.Create_NoteBook)
    .put(NoteBookController.Update_NoteBook)
    .delete(NoteBookController.Delete_NoteBook);
  app.route("/notebooks").get(NoteBookController.get_All_NoteBooks);
};
