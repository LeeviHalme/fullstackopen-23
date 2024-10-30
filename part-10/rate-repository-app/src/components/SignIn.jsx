import { View, StyleSheet, TextInput, Pressable } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import theme from "../theme";

import FormikInput from "./FormikInput";
import SubmitButton from "./SubmitButton";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    paddingTop: 0,
    padding: 15,
  },
});

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <FormikInput f={formik} name="username" placeholder="Username" />
      <FormikInput isSecure f={formik} name="password" placeholder="Password" />
      <SubmitButton f={formik} text="Sign In" />
    </View>
  );
};

const SignInContainer = () => {
  const [signIn] = useSignIn();

  const onSubmit = async values => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignInContainer;
