const { GraphQLError } = require("graphql");
const User = require("../model/userModel");
const { signToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");

const typeDefsUser = `#graphql
  type User {
    _id: ID!
    name: String
    username: String!
    email: String!
    password: String!
  }

  type Token {
    accessToken: String
  }

  type Query {
    users: [User]
    userById(_id: ID!): User
  }

  type Mutation {
    addUser(name: String, username: String, email: String, password: String): User
    loginUser(email: String!, password: String!): Token
  },
`;

const resolversUser = {
  Query: {
    users: async (_, __, { auth }) => {
      let data = auth()
      const users = await User.findAll();
      return users;
    },
    userById: async (_, { _id }) => {
      try {
        if (!_id) {
          throw new GraphQLError("Book ID is required");
        }
        const user = await User.findById(_id);
        console.log(user);
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
        };
        const result = await User.createOne(newUser);
        newUser._id = result.insertedId;

        return newUser;
      } catch (error) {
        throw error;
      }
    },
    loginUser: async (_, { email, password }) => {
      try {
        // console.log(email);
        if (!email) {
          throw new GraphQLError("Email is required");
        }
        if (!password) {
          throw new GraphQLError("Password is required");
        }
        const user = await User.loginUser(email);
        // console.log(user);
        if (!user) {
          throw new Error("Email/Password is incorrect");
        }
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
          throw new Error("Email/Password is incorrect");
        }
        const token = {
          accessToken: signToken({ 
            _id: user._id, 
            email 
          })
        };

        return token;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};

module.exports = { typeDefsUser, resolversUser };
