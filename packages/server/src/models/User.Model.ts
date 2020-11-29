import { NoteBook } from "./NoteBook.model";
import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { Gender } from "../Shared/interfaces/IUser";

export class User {
  @prop({ required: true, unique: true })
  public email!: string;

  @prop()
  public firstName?: string;

  @prop()
  public lastName?: string;

  @prop({ required: true, unique: true, index: true })
  public username!: string;

  @prop({ required: true })
  public password: string;

  @prop({ required: true })
  public createAt: Date;

  @prop({ enum: Gender, type: Number, default: Gender.unknown })
  public gender?: Gender;

  @prop({ ref: () => NoteBook })
  public notebooks?: Ref<NoteBook>[];
}

export const UserModel = getModelForClass(User); // UserModel is a regular Mongoose Model with correct types
