import { useQuery } from "@apollo/client";
import { FlatList, StyleSheet, View } from "react-native";
import { useParams } from "react-router-native";
import { GET_REPOSITORY } from "../graphql/queries";

import RepositoryItem from "./RepositoryItem";
import ReviewItem from "./ReviewItem";
import Text from "./Text";

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    padding: 30,
  },
});

const StandaloneRepository = () => {
  const { repositoryId } = useParams();
  const { data, loading } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId },
    fetchPolicy: "cache-and-network",
  });

  const reviewNodes = data?.repository?.reviews?.edges?.map(edge => edge.node) || [];

  return loading ? (
    <View style={styles.center}>
      <Text>Loading...</Text>
    </View>
  ) : (
    <FlatList
      data={reviewNodes}
      keyExtractor={item => item.id}
      ListHeaderComponent={data && <RepositoryItem item={data.repository} isStandalone />}
      renderItem={item => <ReviewItem item={item} />}
      ListEmptyComponent={<Text>.</Text>}
    />
  );
};
export default StandaloneRepository;
