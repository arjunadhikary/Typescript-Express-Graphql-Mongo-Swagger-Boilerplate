import { connect } from 'mongoose';
import { UserModel } from '../schema/Users';
// 2. Create a Schema corresponding to the document interface.

import * as dotenv from 'dotenv';
dotenv.config();
run().catch((err) => console.log(err));

async function run() {
  // 4. Connect to MongoDB
  await connect(process.env.MONGODB_CONNECTION || 'mongodb://localhost:27017');

  const user = new UserModel({
    name: 'Avishel',
    email: 'avishel@gmail.com',
    avatar: 'https://i.imgur.com/dM7Thhn.png',
  });
  await user.save();

  console.log(user.email); // 'avishek@gmail.com'
}
