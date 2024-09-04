import { useApolloClient, useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useState } from "react";

const Books = props => {
  const query = useQuery(ALL_BOOKS);
  const client = useApolloClient();
  const [genre, setGenre] = useState("");

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
