import { Link } from "react-router-native";
import { Pressable, StyleSheet } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  pressable: {
    marginRight: 20,
  },
});

const AppBarTab = ({ to, children }) => {
  return (
    <Pressable style={styles.pressable}>
      <Link to={to}>
        <Text fontSize="subheading" color="white" fontWeight="bold">
          {children}
        </Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;
