const { GraphQLError } = require("graphql");
const Post = require("../model/postModel");
const { ObjectId } = require("mongodb");

const typeDefsPosts = `#graphql
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
        authorDetail: [UserDetail]
    }

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

    type UserDetail {
    _id: ID
    email: String
    name: String
    username: String
  }

    type Query {
        posts: [Post]
        postById(_id: ID!): Post
        getUser(_id: ID!): Post
        sortByCreatedAt: [Post]
    }

    type Mutation {
        addPost(content: String!, tags: [String], imgUrl: String): Post
        addComment(content: String, _id: ID): Post
        addLike(_id: ID): Post

    }
`;

const resolversPosts = {
  Query: {
    posts: async () => {
      const posts = await Post.findAll();
      return posts;
    },
    postById: async (_, { _id },{ auth }) => {
      auth()
      if (!_id) {
        throw new GraphQLError("Post ID is required");
      }
      const post = await Post.findById(_id);
      return post;
    },
    getUser: async (_, {_id}, {auth}) => {
      try {
        auth()
        // console.log(_id);
        if (!_id) {
          throw new GraphQLError("Post ID is required");
        }
        const post = await Post.getUser({_id})
        return post
      } catch (error) {
        console.log(error);
        throw error
      }
    },
    sortByCreatedAt: async (_, _args, {auth}) => {
      try {
        let data = auth()
        if(!data){
          throw new GraphQLError("Authentication required")
        }
        const result = await Post.sortByCreatedAt()
        // console.log(result);

        return result

      } catch (error) {
        console.log(error);
        throw error
      }
    }
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
          comments: [],
          likes: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        const result = await Post.createOne(newPost);
        newPost._id = result.insertedId;

        return newPost;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    addComment: async (_, { content, _id }, { auth }) => {
      try {
        let data = auth()
        let newComment = {
          _id,
          content,
          username: data.username,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(), 
        }
        const result = await Post.addComment(newComment);
        // newComment._id = result.insertedId;
        // console.log(result);
        
        return result;
      } catch (error) {
        console.log(error);
        throw error
      }
    },
    addLike: async (_, {_id}, {auth}) => {
      try {
        let data = auth()
        if(!data){
          throw new GraphQLError("Login is required")
        }
        let like = {
          username: data.username,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        const result = await Post.addLike(_id, {likes: like});
        console.log(result);
        return result
      } catch (error) {
        console.log(error);
      }
    }
  },
};

module.exports = { typeDefsPosts, resolversPosts };
