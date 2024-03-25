const { ObjectId } = require("mongodb");
const { database } = require('../config/mongo');
const bcrypt = require('bcryptjs');

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
            _id: new ObjectId(String(id)) 
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
            if(password.length < 5) {
                throw new Error("Password must be at least 5 characters");
            }
            payload.password = await bcrypt.hash(payload.password, bcrypt.genSaltSync(10));
            const newUser = await this.userCollection().insertOne(payload);
            // console.log(newUser);
            return newUser;
        } catch (error) {
            console.log(error);
            throw error
        }
    }
}

module.exports = User