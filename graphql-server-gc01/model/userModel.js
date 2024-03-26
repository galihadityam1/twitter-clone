const { ObjectId } = require("mongodb");
const { database, client } = require("../config/mongo");
const bcrypt = require("bcryptjs");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class User {
  static userCollection() {
    return database.collection("users");
  }

  static async findAll() {
    const users = await this.userCollection().find().toArray();
    return users;
  }

  static async findById(id) {
    const user = await this.userCollection().findOne({
      _id: new ObjectId(String(id)),
    });
    return user;
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
              '$match': {
                '_id': new ObjectId(String(_id))
              }
            }, {
              '$lookup': {
                'from': 'follows', 
                'localField': '_id', 
                'foreignField': 'followingId', 
                'as': 'followers'
              }
            }, {
              '$lookup': {
                'from': 'users', 
                'localField': 'followers.followerId', 
                'foreignField': '_id', 
                'as': 'followersDetail'
              }
            }, {
              '$lookup': {
                'from': 'follows', 
                'localField': '_id', 
                'foreignField': 'followerId', 
                'as': 'followings'
              }
            }, {
              '$lookup': {
                'from': 'users', 
                'localField': 'followings.followingId', 
                'foreignField': '_id', 
                'as': 'followingsDetail'
              }
            }, {
              '$project': {
                'password': 0, 
                'followingsDetail.password': 0, 
                'followersDetail.password': 0
              }
            }
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
}

module.exports = User;
