import { Link } from "react-router-native";
import { Pressable, StyleSheet } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  pressable: {
    marginRight: 20,
  },
});

const AppBarTab = ({ to, onPress, children }) => {
  const Title = (
    <Text fontSize="subheading" color="white" fontWeight="bold">
      {children}
    </Text>
  );
  return (
    <Pressable style={styles.pressable} onPress={onPress}>
      {onPress ? Title : <Link to={to}>{Title}</Link>}
    </Pressable>
  );
};

export default AppBarTab;
