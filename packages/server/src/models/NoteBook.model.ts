import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User.Model';

export interface IPet extends Document {
  name: string;
  owner: IUser['_id'];
}

const NoteBookSchema: Schema = new Schema({
  name: { type: String, required: true },
  createAt :{ type: Date, required: true },
  owner: { type: Schema.Types.ObjectId, required: true }
});

export default mongoose.model<IPet>('NoteBook', NoteBookSchema);
