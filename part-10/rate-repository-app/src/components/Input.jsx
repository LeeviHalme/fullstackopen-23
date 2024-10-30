import { StyleSheet, TextInput } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  input: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    fontSize: theme.fontSizes.subheading,
    padding: 10,
    marginTop: 15,
  },
});

const Input = ({ value, style, placeholder, onChange, isSecure, isNumeric }) => {
  return (
    <>
      <TextInput
        style={[styles.input, style]}
        value={String(value)}
        onChangeText={onChange}
        placeholderTextColor={theme.colors.textSecondary}
        autoCapitalize="none"
        placeholder={placeholder || name}
        secureTextEntry={!!isSecure}
        keyboardType={isNumeric ? "numeric" : "default"}
      />
    </>
  );
};

export default Input;
