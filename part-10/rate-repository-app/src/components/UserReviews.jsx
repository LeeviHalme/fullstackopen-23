import { FlatList, StyleSheet, View } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";

import Text from "./Text";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    padding: 30,
  },
});

const UserReviews = () => {
  const { data, loading } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: "cache-and-network",
    variables: {
      includeReviews: true,
    },
  });

  const reviewNodes = data?.me?.reviews?.edges?.map(edge => edge.node) || [];

  return loading ? (
    <View style={styles.center}>
      <Text>Loading...</Text>
    </View>
  ) : (
    <FlatList
      data={reviewNodes}
      keyExtractor={item => item.id}
      renderItem={item => <ReviewItem item={item} isStandalone />}
    />
  );
};

export default UserReviews;
