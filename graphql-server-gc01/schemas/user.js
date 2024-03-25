const { GraphQLError } = require("graphql");
const User = require("../model/userModel");
// const users = [
//   {
//     title: "The Awakening",
//     author: "Kate Chopin",
//   },
//   {
//     title: "City of Glass",
//     author: "Paul Auster",
//   },
// ];

const typeDefsUser = `#graphql
  type User {
    _id: ID!
    name: String
    username: String
    email: String
    password: String
  }

  type Query {
    users: [User]
    userById(_id: ID!): User
  }

  type Mutation {
    addUser(name: String, username: String, email: String, password: String): User
  },
`;

const resolversUser = {
  Query: {
    users: async () => {
      const users = await User.findAll();
      return users;
    },
    userById: async (_, { _id }) => {
      try {
        if (!_id) {
          throw new GraphQLError("Book ID is required");
        }
        const user = await User.findById(_id);
        return user;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    addUser: async (_, { name, username, email, password }) => {
      try {
        if (!name) {
          throw new GraphQLError("Name is required");
        }
        if (!username) {
          throw new GraphQLError("Username is required");
        }
        if (!email) {
          throw new GraphQLError("Email is required");
        }
        if (!password) {
          throw new GraphQLError("Password is required");
        }
        const newUser = {
          name,
          username,
          email,
          password,
        }
        const result = await User.createOne(newUser);
        newUser._id = result.insertedId;
        newUser.password = delete newUser.password;

        return newUser;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = { typeDefsUser, resolversUser };
