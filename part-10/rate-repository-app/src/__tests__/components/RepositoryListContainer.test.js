import { render, screen, within } from "@testing-library/react-native";
import { RepositoryList } from "../../components/RepositoryList";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor: "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl: "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor: "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      // Add your test code here
      render(<RepositoryList repositories={repositories} />);

      const repositoryItems = screen.getAllByTestId("repositoryItem");
      const [firstItem, secondItem] = repositoryItems;

      // check first elements name, description and language
      expect(within(firstItem).getByText("jaredpalmer/formik")).toBeTruthy();
      expect(within(firstItem).getByText("Build forms in React, without the tears")).toBeTruthy();
      expect(within(firstItem).getByText("TypeScript")).toBeTruthy();

      // check "key values" (stars, forks, reviews and rating)
      const firstKeyValues = within(firstItem).getAllByTestId("keyValue");
      expect(within(firstKeyValues[0]).getByText("21.9k")).toBeTruthy();
      expect(within(firstKeyValues[0]).getByText("Stars")).toBeTruthy();
      expect(within(firstKeyValues[1]).getByText("1.6k")).toBeTruthy();
      expect(within(firstKeyValues[1]).getByText("Forks")).toBeTruthy();
      expect(within(firstKeyValues[2]).getByText("3")).toBeTruthy();
      expect(within(firstKeyValues[2]).getByText("Reviews")).toBeTruthy();
      expect(within(firstKeyValues[3]).getByText("88")).toBeTruthy();
      expect(within(firstKeyValues[3]).getByText("Rating")).toBeTruthy();

      // check second element
      expect(within(secondItem).getByText("async-library/react-async")).toBeTruthy();
      expect(within(secondItem).getByText("Flexible promise-based React data loader")).toBeTruthy();
      expect(within(secondItem).getByText("JavaScript")).toBeTruthy();

      const secondKeyValues = within(secondItem).getAllByTestId("keyValue");
      expect(within(secondKeyValues[0]).getByText("1.8k")).toBeTruthy();
      expect(within(secondKeyValues[0]).getByText("Stars")).toBeTruthy();
      expect(within(secondKeyValues[1]).getByText("69")).toBeTruthy();
      expect(within(secondKeyValues[1]).getByText("Forks")).toBeTruthy();
      expect(within(secondKeyValues[2]).getByText("3")).toBeTruthy();
      expect(within(secondKeyValues[2]).getByText("Reviews")).toBeTruthy();
      expect(within(secondKeyValues[3]).getByText("72")).toBeTruthy();
      expect(within(secondKeyValues[3]).getByText("Rating")).toBeTruthy();
    });
  });
});
