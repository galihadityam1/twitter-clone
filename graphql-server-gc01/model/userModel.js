const { ObjectId } = require("mongodb");
const { database, client } = require("../config/mongo");
const bcrypt = require("bcryptjs");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { GraphQLError } = require("graphql");

class User {
  static userCollection() {
    return database.collection("users");
  }

  static followCollection() {
    return database.collection("follows");
  }

  static async findAll() {
    const users = await this.userCollection().find().toArray();
    return users;
  }

  static async findByName(name) {
    try {
      const agg = [
        {
          $match: {
            name: {
              $regex: name,
            },
          },
        },
        {
          $project: {
            password: 0,
          },
        },
      ];
      const cursor = this.userCollection().aggregate(agg);
      const result = await cursor.toArray();
      //   console.log(result);
      return result;
    } catch (error) {}
  }

  static async createOne(payload) {
    try {
      const { username, email, password } = payload;
      const findUsername = await this.userCollection().findOne({ username });
      // console.log(payload);
      if (findUsername) {
        throw new Error("Username is already taken");
      }
      const findEmail = await this.userCollection().findOne({ email });
      if (findEmail) {
        throw new Error("Email is already taken");
      }
      if (password.length < 5) {
        throw new Error("Password must be at least 5 characters");
      }
      payload.password = await hashPassword(password);
      const newUser = await this.userCollection().insertOne(payload);
      // console.log(newUser);
      return newUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async loginUser(username) {
    try {
      //   console.log(username);
      const user = await this.userCollection().findOne({ username });

      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getFollow(_id) {
    try {
      const agg = [
        {
          $match: {
            _id: new ObjectId(String(_id)),
          },
        },
        {
          $lookup: {
            from: "follows",
            localField: "_id",
            foreignField: "followingId",
            as: "followers",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "followers.followerId",
            foreignField: "_id",
            as: "followersDetail",
          },
        },
        {
          $lookup: {
            from: "follows",
            localField: "_id",
            foreignField: "followerId",
            as: "followings",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "followings.followingId",
            foreignField: "_id",
            as: "followingsDetail",
          },
        },
        {
          $project: {
            password: 0,
            "followingsDetail.password": 0,
            "followersDetail.password": 0,
          },
        },
      ];

      const cursor = this.userCollection().aggregate(agg);
      const result = await cursor.toArray();
      //   console.log(result);
      return result[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async followUser(newFollow) {
    try {
      const { followerId, followingId } = newFollow;

      // user not found
      let findUser = await this.userCollection().findOne({ _id: new ObjectId(String(followingId)) });
      if (!findUser) throw new GraphQLError("User not Found")

      // already follow
      let followed = await this.followCollection().findOne(newFollow);
      if (followed) throw new GraphQLError("Already following this user");

      // follow myself
      let user = await this.userCollection().findOne({
        _id: new ObjectId(String(followerId)),
      });
      if (user) throw new GraphQLError("Cant follow yourself");

      let follow = await this.followCollection().insertOne(newFollow);

      return follow;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async myProfile(id) {
    const agg = [
      {
        $match: {
          _id: new ObjectId(String(id)),
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "followingId",
          as: "followers",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "followers.followerId",
          foreignField: "_id",
          as: "followersDetail",
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "followerId",
          as: "followings",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "followings.followingId",
          foreignField: "_id",
          as: "followingsDetail",
        },
      },
      {
        $project: {
          password: 0,
          "followingsDetail.password": 0,
          "followersDetail.password": 0,
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "authorId",
          as: "userPost"
        }
      }
    ];
    const cursor = this.userCollection().aggregate(agg);
    const result = await cursor.toArray();
    return result[0];
  }
}

module.exports = User;
