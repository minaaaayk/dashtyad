import { Request, Response } from "express";

const get_All_NoteBooks = (req: Request, res: Response) => {};
const get_A_NoteBook = (req: Request, res: Response) => {};
const Create_NoteBook = (req: Request, res: Response) => {};
const Delete_NoteBook = (req: Request, res: Response) => {};
const Update_NoteBook = (req: Request, res: Response) => {};

export const UserController = {
  get_All_NoteBooks,
  get_A_NoteBook,
  Create_NoteBook,
  Delete_NoteBook,
  Update_NoteBook,
};
