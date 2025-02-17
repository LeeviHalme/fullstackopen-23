import { StyleSheet, View } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    marginTop: 10,
    gap: 15,
    backgroundColor: theme.colors.white,
  },
  rating: {
    borderRadius: "50%",
    height: 45,
    width: 45,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    gap: 5,
    maxWidth: "90%",
  },
});

const ReviewItem = ({ item, isStandalone }) => {
  const review = item.item;

  // parse date into human readable format
  const parseDate = isoString => {
    const date = new Date(isoString);

    // Get the day, month, and year
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();

    // Format the date as dd.mm.yyyy
    return `${day}.${month}.${year}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.rating}>
        <Text color="primary" fontWeight="bold">
          {review.rating}
        </Text>
      </View>
      <View style={styles.info}>
        <Text fontWeight="bold">
          {isStandalone ? review.repository.fullName : review.user.username}
        </Text>
        <Text color="textSecondary">{parseDate(review.createdAt)}</Text>
        <View>
          <Text style={{ marginTop: 5 }}>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;
