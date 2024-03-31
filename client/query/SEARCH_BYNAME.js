import { gql, useQuery } from "@apollo/client";
const SEARCH_BYNAME = gql`
  query UserByName($name: String) {
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
    userPost {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
}
`;

export default SEARCH_BYNAME