import { gql } from "@apollo/client";
const ADD_USER = gql`
  mutation AddUser(
    $name: String
    $username: String
    $email: String
    $password: String
  ) {
    addUser(
      name: $name
      username: $username
      email: $email
      password: $password
    ) {
      _id
      email
      name
      username
    }
  }
`;

export default ADD_USER;
