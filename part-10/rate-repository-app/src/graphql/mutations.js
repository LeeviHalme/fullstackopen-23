import { gql } from "@apollo/client";

export const GET_AUTH_TOKEN = gql`
  mutation GetToken($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;
