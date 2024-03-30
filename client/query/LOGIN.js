import { gql, useMutation } from "@apollo/client";

const LOGIN = gql`
  mutation Mutation($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      accessToken
    }
  }
`;

export default LOGIN