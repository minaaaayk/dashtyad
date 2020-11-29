import { IUser } from "./IUser";

export interface INoteBook extends Document {
  name: string;
  owner: IUser["_id"];
  _id: string;
  _v: number;
}
