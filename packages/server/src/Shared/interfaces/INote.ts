import { INoteBook } from "./INoteBook";
import { IUser } from "./IUser";

export interface ITask {
  title: string;
  checked: boolean;
}

export interface INote extends Document {
  name: string;
  createAt: Date;
  isActive: boolean;
  content: string;
  tasks: ITask[];
  notebook: INoteBook["_id"];
  owner: IUser["_id"];
}
