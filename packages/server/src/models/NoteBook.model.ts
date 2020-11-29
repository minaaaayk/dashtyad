import { User } from "./User.Model";
import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { Note } from "./Note.model";

export class NoteBook {
  @prop({ required: true, unique: true })
  public name?: string;

  @prop({ required: true })
  public createAt: Date;

  @prop({ ref: () => User })
  public owner: Ref<User>;

  @prop({ ref: () => Note })
  public notes?: Ref<Note>[];
}
export const NoteBookModel = getModelForClass(NoteBook); // UserModel is a regular Mongoose Model with correct types
