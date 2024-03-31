import { gql, useQuery } from "@apollo/client";
const FOLLOW = gql`
mutation Mutation($idFollow: ID) {
    follow(idFollow: $idFollow) {
      _id
      followerId
      followingId
      createdAt
      updatedAt
    }
  }
`;

export default FOLLOW

