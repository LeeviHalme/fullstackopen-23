import { StatusBar } from "expo-status-bar";
import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "@apollo/client";

import Main from "./src/components/Main";
import AuthStorageContext from "./src/contexts/AuthStorageContext";

import AuthStorage from "./src/utils/authStorage";
import createApolloClient from "./src/utils/apolloClient";

const authStorage = new AuthStorage();
const client = createApolloClient(authStorage);

export default function App() {
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={client}>
          <AuthStorageContext.Provider value={authStorage}>
            <Main />
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
}
