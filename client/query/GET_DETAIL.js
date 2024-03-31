import { gql, useQuery } from "@apollo/client";
const GET_DETAIL = gql`
  query Query($id: ID!) {
    getUser(_id: $id) {
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

export default GET_DETAIL