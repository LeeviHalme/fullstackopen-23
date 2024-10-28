import { View, StyleSheet, TextInput, Pressable } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    paddingTop: 0,
    padding: 15,
  },
  input: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    fontSize: theme.fontSizes.subheading,
    padding: 10,
    marginTop: 15,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    marginTop: 15,
  },
  errorMessage: {
    color: theme.colors.error,
    marginTop: 5,
  },
  errorInput: {
    borderColor: theme.colors.error,
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

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          formik.touched.username && formik.errors.username && styles.errorInput,
        ]}
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        placeholderTextColor={theme.colors.textSecondary}
        placeholder="Username"
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.errorMessage}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          formik.touched.password && formik.errors.password && styles.errorInput,
        ]}
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        placeholderTextColor={theme.colors.textSecondary}
        secureTextEntry
        placeholder="Password"
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorMessage}>{formik.errors.password}</Text>
      )}
      <Pressable onPress={formik.handleSubmit}>
        <View style={styles.button}>
          <Text fontWeight="bold" color="white">
            Sign In
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = values => console.log(values);

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
