const { GraphQLError } = require("graphql");
const Post = require("../model/postModel");

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
        addPost(content: String, tags: [String], imgUrl: String, authorId: ID): Post
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
    addPost: async (_, { content, tags, imgUrl, authorId }) => {
      try {
        const createdAt = new Date().toDateString();
        const updatedAt = new Date().toDateString();
        const newPost = {
          content,
          tags,
          imgUrl,
          authorId,
          createdAt,
          updatedAt,
        };
        const result = await Post.createOne(newPost);
        newPost._id = result._id;

        return newPost;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};

module.exports = { typeDefsPosts, resolversPosts };
