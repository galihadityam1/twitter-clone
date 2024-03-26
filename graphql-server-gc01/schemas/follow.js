const typeDefsFollow = `#graphql
    type Follow {
        _id: ID!
        followerId: ID!
        followingId: ID!
        createdAt: String
        updatedAt: String
    }

    type Query {
        followsByUser(_id: ID!): Follow
        userFollowers(_id: ID!): Follow
    }
`;

const resolversFollow = {
    Query: {
        followsByUser: async (_, { _id }, { auth }) => {

        }
    }
}
