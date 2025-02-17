import * as yup from "yup";
import { StyleSheet, View } from "react-native";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { CREATE_NEW_USER } from "../graphql/mutations";
import useSignIn from "../hooks/useSignIn";
import theme from "../theme";

import FormikInput from "./FormikInput";
import SubmitButton from "./SubmitButton";

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username name is required"),
  password: yup.string().required("Password name is required"),
  passwordConfirmation: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password"), null], "Passwords don't match"),
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    paddingTop: 0,
    padding: 15,
  },
});

const SignUpForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <FormikInput f={formik} name="username" placeholder="Username" />
      <FormikInput isSecure f={formik} name="password" placeholder="Password" />
      <FormikInput
        isSecure
        f={formik}
        name="passwordConfirmation"
        placeholder="Password confirmation"
      />
      <SubmitButton f={formik} text="Sign Up" />
    </View>
  );
};

const SignUpContainer = () => {
  const [createUser] = useMutation(CREATE_NEW_USER);
  const [signIn] = useSignIn();

  const onSubmit = async values => {
    const { username, password } = values;

    console.log("Submitted:", values);

    try {
      // first create the user then try to sign them in
      await createUser({ variables: { user: { username, password } } });
      await signIn({ username, password });

      console.log("Created user and signed in!");
    } catch (error) {
      console.log(error);
    }
  };

  return <SignUpForm onSubmit={onSubmit} />;
};

export default SignUpContainer;
