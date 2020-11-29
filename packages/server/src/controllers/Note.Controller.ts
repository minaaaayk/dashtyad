import { Request, Response } from "express";

const get_All_Notes = (req: Request, res: Response) => {};
const get_A_Note = (req: Request, res: Response) => {};
const Create_Note = (req: Request, res: Response) => {};
const Delete_Note = (req: Request, res: Response) => {};
const Update_Note = (req: Request, res: Response) => {};

export const NoteController = {
  get_All_Notes,
  get_A_Note,
  Create_Note,
  Delete_Note,
  Update_Note,
};
