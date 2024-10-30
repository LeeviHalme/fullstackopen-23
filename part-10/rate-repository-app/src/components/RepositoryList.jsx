import { FlatList, View, StyleSheet } from "react-native";
import { useDebounce } from "use-debounce";

import Input from "./Input";
import Text from "./Text";
import RepositoryItem from "./RepositoryItem";
import SortingMenu from "./SortingMenu";
import useRepositories from "../hooks/useRepositories";
import { useState } from "react";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: theme.colors.white,
    zIndex: 1000,
  },
  input: {
    marginTop: 0,
    marginBottom: 15,
  },
  separator: {
    height: 10,
  },
  list: {
    zIndex: 0,
  },
  center: {
    alignItems: "center",
    padding: 30,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;
const EmptyList = () => (
  <View style={styles.center}>
    <Text>No search results</Text>
  </View>
);

export const RepositoryList = ({ repositories, setSorter, search, setSearch, loading }) => {
  // Get the nodes from the edges array
  const repositoryNodes = repositories?.edges?.map(edge => edge.node) || [];

  // when the user changes the sorting
  const onChangeValue = sorter => {
    switch (sorter) {
      default:
      case "latest-repositories":
        setSorter(["CREATED_AT", "DESC"]);
        break;
      case "rating-hilo":
        setSorter(["RATING_AVERAGE", "DESC"]);
        break;
      case "rating-lohi":
        setSorter(["RATING_AVERAGE", "ASC"]);
        break;
    }
  };

  return (
    <>
      {/* Make the sorting menu stick to the top of the repository list.

          This was made due to z-index issues with the picker when
          placed as ListHeaderComponent for the FlatList below. 
      */}
      <View style={styles.container}>
        <Input
          style={styles.input}
          value={search}
          onChange={setSearch}
          placeholder="Search for repository..."
        />
        <SortingMenu onChangeValue={onChangeValue} />
      </View>
      {loading ? (
        <View style={styles.center}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <FlatList
          style={styles.list}
          data={repositoryNodes}
          keyExtractor={item => item.id}
          renderItem={RepositoryItem}
          ItemSeparatorComponent={ItemSeparator}
          ListEmptyComponent={EmptyList}
        />
      )}
    </>
  );
};

const RepositoryListContainer = () => {
  const [sorter, setSorter] = useState(["CREATED_AT", "DESC"]);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const { repositories, loading } = useRepositories(sorter, debouncedSearch);

  return (
    <RepositoryList
      repositories={repositories}
      setSorter={setSorter}
      search={search}
      setSearch={setSearch}
      loading={loading}
    />
  );
};

export default RepositoryListContainer;
