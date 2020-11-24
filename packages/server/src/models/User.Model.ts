import mongoose, { Schema, Document } from 'mongoose';

export enum Gender {
  male = 'male',
  female = 'female',
  undisclosed = 'undisclosed'
}

export interface Address extends Document {
  street: string;
  city: string;
  postCode: string;
}

export interface IUser extends Document {
  email: string;
  firstName?: string;
  lastName?: string;
  username: string;
  password:string;
  gender?: Gender;
 // address?: Address;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String},
  lastName: { type: String},
  username: { type: String, required: true },
  password: { type: String, required: true },
  // Gets the Mongoose enum from the TypeScript enum
  gender: { type: String, enum: Object.values(Gender) },
  // address: {
  //   street: { type: String },
  //   city: { type: String },
  //   postCode: { type: String }
  // }
});

// Export the model and return your IUser interface
export default mongoose.model<IUser>('User', UserSchema);
