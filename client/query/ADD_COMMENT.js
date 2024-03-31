import { gql, useQuery } from "@apollo/client";
const ADD_COMMENT = gql`
 mutation Mutation($content: String, $id: ID) {
  addComment(content: $content, _id: $id) {
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

export default ADD_COMMENT