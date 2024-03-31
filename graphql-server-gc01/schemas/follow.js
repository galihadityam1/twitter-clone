const { ObjectId } = require("mongodb");
const User = require("../model/userModel");
const { GraphQLError } = require("graphql");


const typeDefsFollow = `#graphql
    type Follow {
        _id: ID!
        followerId: ID!
        followingId: ID!
        createdAt: String
        updatedAt: String
    }

    type Mutation {
        follow(idFollow: ID): Follow
    }
`;

const resolversFollow = {
  Mutation: {
    follow: async (_, args, { auth }) => {
      try {
        let authen = auth();
        if(!authen) throw new GraphQLError("Authentication required");

        let { _id } = authen;
        const { idFollow } = args;
        if(!idFollow) throw new GraphQLError("idFollow is required");
        const followingId = new ObjectId(String(idFollow));
        const followerId = new ObjectId(String(_id));
        const newFollow = {
            followingId,
            followerId
        };
        let data = await User.followUser(newFollow);
        newFollow._id = data.insertedId;
        // console.log(data);
        return newFollow;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};

module.exports = { typeDefsFollow, resolversFollow };
