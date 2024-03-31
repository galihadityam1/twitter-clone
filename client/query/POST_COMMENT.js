import { gql, useQuery } from "@apollo/client";
const POST_COMMENT = gql`
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
    createdAt
    updatedAt
  }
}
`;

export default POST_COMMENT