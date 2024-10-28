import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.appBarBackground,
    paddingTop: Constants.statusBarHeight + 10,
    padding: 20,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab to="/">Repositories</AppBarTab>
        <AppBarTab to="/sign-in">Sign In</AppBarTab>
      </ScrollView>
    </View>
  );
};

export default AppBar;
