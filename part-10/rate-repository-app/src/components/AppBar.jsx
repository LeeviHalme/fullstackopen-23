import { View, StyleSheet, ScrollView } from "react-native";
import { useQuery } from "@apollo/client";
import Constants from "expo-constants";
import theme from "../theme";
import useSignOut from "../hooks/useSignOut";
import { GET_CURRENT_USER } from "../graphql/queries";

import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.appBarBackground,
    paddingTop: Constants.statusBarHeight + 10,
    padding: 20,
  },
});

const AppBar = () => {
  const { data } = useQuery(GET_CURRENT_USER);
  const signOut = useSignOut();

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          columnGap: 20,
        }}>
        <AppBarTab to="/">Repositories</AppBarTab>
        {data?.me ? (
          <>
            <AppBarTab to="/review">Create a review</AppBarTab>
            <AppBarTab to="/my-reviews">My Reviews</AppBarTab>
            <AppBarTab onPress={signOut}>Sign Out</AppBarTab>
          </>
        ) : (
          <>
            <AppBarTab to="/sign-in">Sign In</AppBarTab>
            <AppBarTab to="/sign-up">Sign Up</AppBarTab>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
