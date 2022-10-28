"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.root = exports.schema = void 0;
const graphql_1 = require("graphql");
const constants_1 = require("../utils/constants");
exports.schema = (0, graphql_1.buildSchema)(`
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
const getUser = (args) => constants_1.users.find((u) => u.id === args.id);
const getUsers = () => constants_1.users;
const createUser = (args) => {
    const user = {
        id: constants_1.users.length + 1,
        ...args.input,
    };
    constants_1.users.push(user);
    return user;
};
const updateUser = (args) => {
    const index = constants_1.users.findIndex((u) => u.id === args.user.id);
    const targetUser = constants_1.users[index];
    if (targetUser)
        constants_1.users[index] = args.user;
    return targetUser;
};
exports.root = {
    getUser,
    getUsers,
    createUser,
    updateUser,
};
