import { gql, useQuery } from "@apollo/client";
const GET_POST = gql`
  query Query {
    sortByCreatedAt {
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
      authorDetail {
        _id
        email
        name
        username
      }
    }
  }
`;

export default GET_POST