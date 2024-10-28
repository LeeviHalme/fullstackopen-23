import { FlatList, View, StyleSheet } from "react-native";
import Text from "./Text";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();

  // Get the nodes from the edges array
  const repositoryNodes = repositories?.edges?.map(edge => edge.node) || [];

  return (
    <FlatList
      data={repositoryNodes}
      keyExtractor={item => item.id}
      renderItem={RepositoryItem}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default RepositoryList;
