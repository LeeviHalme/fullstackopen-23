import { useApolloClient, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";
import { GET_AUTH_TOKEN } from "../graphql/mutations";
import useAuthStorage from "../hooks/useAuthStorage";

const useSignIn = () => {
  const [mutate, result] = useMutation(GET_AUTH_TOKEN);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const signIn = async ({ username, password }) => {
    // call the mutation
    const result = await mutate({ variables: { username, password } });
    const token = result.data.authenticate.accessToken;

    // store the access token and refetch queries
    await authStorage.setAccessToken(token);
    await apolloClient.resetStore();

    // navigate to repositories
    navigate("/");

    return result;
  };

  return [signIn, result];
};

export default useSignIn;
