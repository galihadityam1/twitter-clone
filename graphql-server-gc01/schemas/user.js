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
    password: String
    followers: [Follow]
    followersDetail: [UserDetail]
    followings: [Follow]
    followingsDetail: [UserDetail]
  }

  type Follow {
    _id: ID
    followerId: ID
    followingId: ID
  }

  type UserDetail {
    _id: ID
    email: String
    name: String
    username: String
  }

  type Token {
    accessToken: String
  }

  type Query {
    users: [User]
    userByName(name: String): [User]
    getFollow: User

  }

  type Mutation {
    addUser(name: String, username: String, email: String, password: String): User
    loginUser(username: String!, password: String!): Token
  },
`;

const resolversUser = {
  Query: {
    users: async (_, __, { auth }) => {
      let data = auth()
      const users = await User.findAll();
      return users;
    },
    userByName: async (_, { name }) => {
      try {
        if (!name) {
          throw new GraphQLError("name is required");
        }
        const user = await User.findByName(name);
        // console.log(user);
        return user;
      } catch (error) {
        throw error;
      }
    },
    getFollow: async (_, _args, { auth }) => {
      try {
        let data = auth()
        let id = data._id
        if (!id) {
          throw new GraphQLError("User ID is required");
        }
        const user = await User.getFollow(id);
        return user
      } catch (error) {
        console.log(error);
        throw error
      }
    }
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
    loginUser: async (_, { username, password }) => {
      try {
        // console.log(username);
        if (!username) {
          throw new GraphQLError("username is required");
        }
        if (!password) {
          throw new GraphQLError("Password is required");
        }
        const user = await User.loginUser(username);
        // console.log(user);
        if (!user) {
          throw new Error("Username/Password is incorrect");
        }
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
          throw new Error("Username/Password is incorrect");
        }
        const token = {
          accessToken: signToken({ 
            _id: user._id, 
            username 
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
