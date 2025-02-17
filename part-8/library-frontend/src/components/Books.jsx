import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import { ALL_BOOKS, BOOK_ADDED } from "../queries";
import { useState } from "react";

const Books = props => {
  const query = useQuery(ALL_BOOKS);
  const client = useApolloClient();
  const [genre, setGenre] = useState("");

  // add book to cache when new book is added
  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      window.alert(`New book '${addedBook.title}' added!`);
      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        };
      });
    },
  });

  if (!props.show) {
    return null;
  }

  if (query.loading) {
    return "loading...";
  }

  const chooseGenre = g => {
    setGenre(g === genre ? "" : g);
    client.refetchQueries({ include: [ALL_BOOKS] });
  };

  return (
    <div>
      <h2>books</h2>
      {genre && (
        <p>
          in genre <b>{genre}</b>
        </p>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {query.data.allBooks
            .filter(book => (genre ? book.genres?.includes(genre) : true))
            .map(a => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {query.data.allBooks
        .map(book => book.genres)
        .flat()
        .map((g, i) => (
          <button key={i} onClick={() => chooseGenre(g)}>
            {g}
          </button>
        ))}
    </div>
  );
};

export default Books;
