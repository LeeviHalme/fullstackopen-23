import { StyleSheet, TextInput } from "react-native";
import theme from "../theme";

import Text from "./Text";

const styles = StyleSheet.create({
  input: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    fontSize: theme.fontSizes.subheading,
    padding: 10,
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

const FormikInput = ({ f: formik, style, name, placeholder, isSecure, isNumeric }) => {
  return (
    <>
      <TextInput
        style={[
          styles.input,
          formik.touched[name] && formik.errors[name] && styles.errorInput,
          style,
        ]}
        value={String(formik.values[name])}
        onChangeText={formik.handleChange(name)}
        placeholderTextColor={theme.colors.textSecondary}
        autoCapitalize="none"
        placeholder={placeholder || name}
        secureTextEntry={!!isSecure}
        keyboardType={isNumeric ? "numeric" : "default"}
      />
      {formik.touched[name] && formik.errors[name] && (
        <Text style={styles.errorMessage}>{formik.errors[name]}</Text>
      )}
    </>
  );
};

export default FormikInput;
