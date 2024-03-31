import { gql, useQuery } from "@apollo/client";
const SEARCH_BYNAME = gql`
  query Query($name: String) {
  userByName(name: $name) {
    _id
    name
    username
    email
    followers {
      _id
      followerId
      followingId
      createdAt
      updatedAt
    }
    followings {
      _id
      followerId
      followingId
      createdAt
      updatedAt
    }
  }
}
`;

export default SEARCH_BYNAME