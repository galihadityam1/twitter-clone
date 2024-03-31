import { gql, useQuery } from "@apollo/client";
const ADD_LIKE = gql`
  mutation Mutation($id: ID) {
  addLike(_id: $id) {
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
`;

export default ADD_LIKE