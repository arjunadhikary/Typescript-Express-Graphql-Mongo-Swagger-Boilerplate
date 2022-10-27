import { model, Schema } from 'mongoose';
import { isDate } from 'util/types';
import isEmail from 'validator/lib/isEmail';

// 1. Create an interface representing a document in MongoDB.
/**
Name
Gender
Phone
Email
Address
Nationality
Date of birth
Education background
Preferred mode of contact(select one from email, phone, none)
 */

enum MODE_OF_CONTACT {
  'EMAIL',
  'PHONE',
  'NONE',
}
interface IUser {
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
