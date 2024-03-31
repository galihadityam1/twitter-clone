import { gql, useQuery } from "@apollo/client";
const GET_PROFILE = gql`
  query Query {
  myProfile {
    _id
    name
    username
    email
    password
    userPost {
      _id
      content
      imgUrl
      authorId
      createdAt
      updatedAt
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
      tags
    }
    followers {
      _id
      followerId
      followingId
      createdAt
      updatedAt
    }
    followersDetail {
      _id
      email
      name
      username
    }
    followings {
      _id
      followerId
      followingId
      createdAt
      updatedAt
    }
    followingsDetail {
      _id
      email
      name
      username
    }
  }
}
`;

export default GET_PROFILE