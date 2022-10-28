import { buildSchema } from 'graphql';
import { IUser, UserModel } from '../schema/Users';

export const schema = buildSchema(`
     input  UserInput {
        name: String
        email: String
        phone: String
        address: String
        dob: String
        education: String
        modeofcontact: String
    }
    scalar Date
    type User {
        name: String
        email: String
        phone: String
        address: String
        dob: String
        education: String
        modeofcontact: String
    }

    type Mutation {
        createUser(input: UserInput): User
        updateUser(id: Int!, input: UserInput): User
    }

    type Query {
        getUser(id: String): User
        getUsers: [User]
    }
`);

const getUser = async (args: { id: number }): Promise<IUser | undefined> =>
  await UserModel.findById(args.id);

const getUsers = async (): Promise<IUser[]> =>
  (await UserModel.find()) as IUser[];

const createUser = async (args: { input: IUser }): Promise<IUser> => {
  const user = new UserModel({ ...args.input });
  const returnedUser = await user.save();
  return returnedUser;
};

export const root = {
  getUser,
  getUsers,
  createUser,
};
