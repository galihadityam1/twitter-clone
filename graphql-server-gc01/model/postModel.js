const { ObjectId } = require("mongodb");
const { database } = require("../config/mongo");
const { GraphQLError } = require("graphql");

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
      _id: new ObjectId(String(id)),
    });
    if (!post) throw new GraphQLError("Post not found");
    return post;
  }

  static async createOne(payload) {
    try {
      const newPost = await this.postCollection().insertOne(payload);
      return newPost;
    } catch (error) {
      console.log(error);
    }
  }

  static async getUser({ _id }) {
    try {
      const findPost = await this.postCollection().findOne({
        _id: new ObjectId(String(_id)),
      });
      if (!findPost) throw new GraphQLError("Post not found");

      const agg = [
        {
          $match: {
            _id: new ObjectId(String(_id)),
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "authorId",
            foreignField: "_id",
            as: "authorDetail",
          },
        },
        {
          $unwind: {
            path: "$authorDetail",
          },
        },
        {
          $project: {
            "authorDetail.password": 0,
          },
        },
      ];

      const cursor = this.postCollection().aggregate(agg);
      const result = await cursor.toArray();
      //   console.log(result);
      return result[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async addComment(newComment) {
    try {
      const { _id, content, username, createdAt, updatedAt } = newComment;
      const agg = [
        {
          $match: {
            _id: new ObjectId(String(_id)),
          },
        },
        {
          $group: {
            _id: new ObjectId(String(_id)),
            comments: {
              $push: {
                content: content,
                username: username,
                createdAt,
                updatedAt,
              },
            },
          },
        },
      ];

      const cursor = this.postCollection().aggregate(agg);
      const result = await cursor.toArray();
      await this.postCollection().updateOne(
        { _id: new ObjectId(String(_id)) },
        { $push: { comments: result[0].comments[0] } }
      );
      const post = await this.postCollection().findOne({
        _id: new ObjectId(String(_id)),
      });

      //   console.log(post);
      return post;
    } catch (error) {
      console.log(error);
    }
  }

  static async addLike(id, likes) {
    try {
      if (!id || !likes) throw new GraphQLError("Id and likes are required");
      // console.log(like.username);
      const postLiked = await this.postCollection().findOne({
        _id: new ObjectId(String(id)),
        likes: { $elemMatch: { username: likes.username } },
      });
      //   console.log(postLiked);
      if (postLiked) return new GraphQLError("Post already liked");

      await this.postCollection().updateOne(
        { _id: new ObjectId(String(id)) },
        { $push: { likes } },
        { returnOriginal: false }
      );
      //   console.log(updated);

      let post = await this.postCollection().findOne({
        _id: new ObjectId(String(id)),
      });
      //   console.log(post);

      return post;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async sortByCreatedAt() {
    try {
      const agg = [
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "authorId",
            foreignField: "_id",
            as: "authorDetail",
          },
        },
        {
          $unwind: {
            path: "$authorDetail",
          },
        },
        {
          $project: {
            "authorDetail.password": 0,
          },
        },
      ];

      const cursor = this.postCollection().aggregate(agg);
      const result = await cursor.toArray();
      // console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Post;
