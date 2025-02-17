import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";

import RepositoryList from "./RepositoryList";
import StandaloneRepository from "./StandaloneRepository";
import AppBar from "./AppBar";
import theme from "../theme";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Review from "./Review";
import UserReviews from "./UserReviews";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/repository/:repositoryId" element={<StandaloneRepository />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/review" element={<Review />} />
        <Route path="/my-reviews" element={<UserReviews />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
