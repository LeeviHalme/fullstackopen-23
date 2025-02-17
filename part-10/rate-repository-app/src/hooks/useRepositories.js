import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (sorter, searchKeyword) => {
  const [orderBy, orderDirection] = sorter;
  const { loading, data, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      orderBy,
      orderDirection,
      searchKeyword,
    },
  });

  return { repositories: data?.repositories, loading, refetch };
};

export default useRepositories;
