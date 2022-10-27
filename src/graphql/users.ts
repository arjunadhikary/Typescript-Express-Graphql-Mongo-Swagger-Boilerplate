import { buildSchema } from 'graphql';
import { users } from '../utils/constants';

export const schema = buildSchema(`
    input UserInput {
        email: String!
        name: String!

    }

    type User {
        id: Int!
        name: String!
        email: String!
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

type User = {
  id: number;
  name: string;
  email: string;
};

type UserInput = Pick<User, 'email' | 'name'>;

const getUser = (args: { id: number }): User | undefined =>
  users.find((u) => u.id === args.id);

const getUsers = (): User[] => users;

const createUser = (args: { input: UserInput }): User => {
  const user = {
    id: users.length + 1,
    ...args.input,
  };
  users.push(user);
  return user;
};

const updateUser = (args: { user: User }): User => {
  const index = users.findIndex((u) => u.id === args.user.id);
  const targetUser = users[index];
  if (targetUser) users[index] = args.user;
  return targetUser;
};

export const root = {
  getUser,
  getUsers,
  createUser,
  updateUser,
};
