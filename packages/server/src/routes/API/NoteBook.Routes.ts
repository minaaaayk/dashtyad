import { NoteController } from "./../../controllers/Note.Controller";
import { NoteBookController } from "./../../controllers/NoteBook.Controller";
import bodyParser from "body-parser";
import { Application } from "express";

export const NoteBookRouter = (app: Application) => {
  const Parser = bodyParser.json();
  app
    .route("/notebook")
    .get(Parser, NoteController.get_All_Notes)
    .post(Parser, NoteBookController.Create_NoteBook)
    .put(Parser, NoteBookController.Update_NoteBook)
    .delete(Parser, NoteBookController.Delete_NoteBook);
  app.route("/notebooks").get(NoteBookController.get_All_NoteBooks);
};
