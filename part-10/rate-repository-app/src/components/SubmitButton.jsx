import { Pressable, StyleSheet, View } from "react-native";
import theme from "../theme";

import Text from "./Text";

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    marginTop: 15,
  },
});

const SubmitButton = ({ f: formik, text }) => {
  return (
    <Pressable onPress={formik.handleSubmit}>
      <View style={styles.button}>
        <Text fontWeight="bold" color="white">
          {text}
        </Text>
      </View>
    </Pressable>
  );
};

export default SubmitButton;
