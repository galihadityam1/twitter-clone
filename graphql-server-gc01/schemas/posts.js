const { GraphQLError } = require("graphql");
const Post = require("../model/postModel");
const { ObjectId } = require("mongodb");

const typeDefsPosts = `#graphql
    type Comments {
        content: String!
        username: String!
        createdAt: String
        updatedAt: String
    }

    type Likes {
        username: String!
        createdAt: String
        updatedAt: String
    }

    type Post {
        _id: ID!
        content: String
        tags: [String]
        imgUrl: String
        authorId: ID
        comments: [Comments]
        likes: [Likes]
        createdAt: String
        updatedAt: String
    }

    type Query {
        posts: [Post]
        postById(_id: ID!): Post
    }

    type Mutation {
        addPost(content: String, tags: [String], imgUrl: String): Post
    }
`;

const resolversPosts = {
  Query: {
    posts: async () => {
      const posts = await Post.findAll();
      return posts;
    },
    postById: async (_, { _id }) => {
      if (!_id) {
        throw new GraphQLError("Post ID is required");
      }
      const post = await Post.findById(_id);
      return post;
    },
  },
  Mutation: {
    addPost: async (_, { content, tags, imgUrl }, { auth }) => {
      try {
        let data = auth();
        let authorId = new ObjectId(String(data._id));
        const newPost = {
          content,
          tags,
          imgUrl,
          authorId,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const result = await Post.createOne(newPost);
        newPost._id = result.insertedId;

        return newPost;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};

module.exports = { typeDefsPosts, resolversPosts };
