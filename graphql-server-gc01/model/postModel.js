const { ObjectId } = require("mongodb");
const { database } = require('../config/mongo');

class Post {
    static postCollection() {
        return database.collection("posts");
    }

    static async findAll() {
        const posts = await this.postCollection().find().toArray();
        return posts;   
    }

    static async findById(id) { 
        const post = await this.postCollection().findOne({
            _id: new ObjectId(String(id))
        });
        return post;
    }

    static async createOne(payload) {
        try {
            const { content, tags, imgUrl, authorId } = payload;
        } catch (error) {
            
        }
    }
}

module.exports = Post