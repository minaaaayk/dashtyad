import { User } from "./User.Model";
import { NoteBook } from "./NoteBook.model";
import { prop, getModelForClass, Ref } from "@typegoose/typegoose";

export class Task {
  @prop({ required: true })
  public title: string;

  @prop({ default: false })
  public checked?: boolean;
}

export class Note {
  @prop({ required: true, unique: true })
  public name: string;

  @prop({ required: true })
  public createAt: Date;

  @prop()
  public isActive?: boolean;

  @prop()
  public content?: string;

  @prop({ type: () => [Task] })
  public tasks?: Task[];

  @prop({ ref: 'NoteBook' })
  public notebook?: Ref<NoteBook>;

  @prop({ ref: 'User' })
  public owner: Ref<User>;
}
export const NoteModel = getModelForClass(Note); // UserModel is a regular Mongoose Model with correct types
