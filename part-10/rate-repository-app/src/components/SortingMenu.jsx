import { useState } from "react";
import { StyleSheet, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
    flexGrow: 1,
  },
  picker: {
    // backgroundColor: theme.colors.error,
  },
});

const SortingMenu = ({ onChangeValue }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Latest repositories", value: "latest-repositories" },
    { label: "Rating: Highest to lowest", value: "rating-hilo" },
    { label: "Rating: Lowest to highest", value: "rating-lohi" },
  ]);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Sort repositories"
        onChangeValue={onChangeValue}
      />
    </View>
  );
};

export default SortingMenu;
