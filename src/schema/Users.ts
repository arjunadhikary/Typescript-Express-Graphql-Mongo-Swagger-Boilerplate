import { model, Schema } from 'mongoose';
import { isDate } from 'util/types';
import isEmail from 'validator/lib/isEmail';

enum MODE_OF_CONTACT {
  'EMAIL',
  'PHONE',
  'NONE',
}
export interface IUser {
  name: string;
  email: string;
  phone: string;
  address: string;
  dob: Date;
  education: string;
  modeofcontact: string;
}
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, validate: [isEmail, 'invalid email'] },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  dob: { type: Date, required: true, validate: [isDate, 'invalid date'] },
  education: { type: String, required: true },
  modeofcontact: {
    type: String,
    enum: MODE_OF_CONTACT,
  },
});

export const UserModel = model<IUser>('User', userSchema);
