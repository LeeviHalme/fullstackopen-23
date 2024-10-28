import { Image, StyleSheet, View } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    width: "100%",
  },
  info: {
    flexDirection: "row",
    padding: 15,
    gap: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  details: {
    alignItems: "flex-start",
    rowGap: 5,
  },
  language: {
    borderRadius: 5,
    padding: 5,
    backgroundColor: theme.colors.primary,
  },
  keyValues: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  box: {
    alignItems: "center",
  },
});

const roundValue = value => (value > 1000 ? (value / 1000).toFixed(1) + "k" : value);

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
        <View style={styles.details}>
          <Text fontWeight="bold">{item.fullName}</Text>
          <Text color="textSecondary">{item.description}</Text>
          <View style={styles.language}>
            <Text color="white">{item.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.keyValues}>
        <View style={styles.box}>
          <Text fontWeight="bold">{roundValue(item.stargazersCount)}</Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View style={styles.box}>
          <Text fontWeight="bold">{roundValue(item.forksCount)}</Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View style={styles.box}>
          <Text fontWeight="bold">{roundValue(item.reviewCount)}</Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View style={styles.box}>
          <Text fontWeight="bold">{roundValue(item.ratingAverage)}</Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
