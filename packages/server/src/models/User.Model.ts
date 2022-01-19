import { NoteBook } from "./NoteBook.model";
import { prop, getModelForClass, Ref, } from "@typegoose/typegoose";
import { staticMethod , InstanceType} from "typegoose"
import * as bcrypt from "bcryptjs";

export interface Credentials {
    username: string;
    password: string;
}

export enum Gender {
  male = 1,
  female = 2,
  unknown = 3,
}


export enum Role {
    Admin    = 'ADMIN',
    Guest    = 'GUEST',
    Regular  = 'REGULAR'
}

export class User implements Credentials {
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


  @prop({ required: false })
  public updateAt?: Date;

  @prop({required: false, default: Role.Regular})
  public role: Role;

  @prop({ enum: Gender, type: Number, default: Gender.unknown })
  public gender?: Gender;

  @prop({ required: false, ref: () => NoteBook, default: [] })
  public notebooks?: Ref<NoteBook>[];


  @staticMethod
  public static hashPassword( unEncryptedPassword: string | number): Promise<String> {
    return bcrypt.hash( String(unEncryptedPassword), 8);
  }


   @staticMethod
    static async findByCredentials({ username, password }: Credentials ) {
      const hashedPassword = await this.hashPassword(password)
      .then((hashPass)=> String(hashPass));
      return UserModel.findOne({ where: {
            username, 
            password: hashedPassword, 
        }});

    }
}

export const UserModel = getModelForClass(User); // UserModel is a regular Mongoose Model with correct types
export type UserType = InstanceType<User>;
