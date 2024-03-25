const { ObjectID } = require("mongodb");
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
            _id: new ObjectID(String(id)) 
        });
        return user;
    }

    static async createOne(payload) {
        payload.password = await bcrypt.hash(payload.password, bcrypt.genSaltSync(10));
        const newUser = await this.userCollection().insertOne(payload);
        return newUser;
    }
}

module.exports = User