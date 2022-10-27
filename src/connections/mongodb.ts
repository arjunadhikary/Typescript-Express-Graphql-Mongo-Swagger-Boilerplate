import { connect } from 'mongoose';
import { UserModel } from '../schema/Users';
// 2. Create a Schema corresponding to the document interface.

import * as dotenv from 'dotenv';
dotenv.config();
run().catch((err) => console.log(err));

async function run() {
  try {
    await connect(
      process.env.MONGODB_CONNECTION || 'mongodb://localhost:27017'
    );
  } catch (error) {
    console.log(error);
  }
}
run();
