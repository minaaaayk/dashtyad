export enum Gender {
  male = 1,
  female = 2,
  unknown = 3,
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
  password: string;
  gender?: Gender;
  _id: string;
  _v: number;
  // address?: Address;
}
