import { useQuery } from "@apollo/client";
import { RECOMMENDED_BOOKS } from "../queries";

const Recommended = props => {
  const query = useQuery(RECOMMENDED_BOOKS);

  if (!props.show) {
    return null;
  }

  if (query.loading) {
    return "loading...";
  }

  return (
    <div>
      <h2>recommended</h2>
      <p>
        books in your favourite genre: <b>{query.data.me.favoriteGenre || "no favourite genre"}</b>
      </p>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {query.data.recommendedBooks
            .filter(book => book.genres.includes(query.data.me.favoriteGenre))
            .map(book => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommended;
