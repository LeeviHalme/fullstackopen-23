import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, UPDATE_BIRTHYEAR } from "../queries";
import { useState } from "react";

const Authors = props => {
  const query = useQuery(ALL_AUTHORS);
  const mtnOptions = { refetchQueries: [{ query: ALL_AUTHORS }] };
  const [updateBirthyear, { loading }] = useMutation(UPDATE_BIRTHYEAR, mtnOptions);
  const [selectedAuthor, setSelectedAuthor] = useState();
  const [birthyear, setBirthyear] = useState("");

  if (!props.show) {
    return null;
  }

  if (query.loading) {
    return "loading...";
  }

  // when form is submitted
  const submit = async event => {
    event.preventDefault();

    // console.log("set birthyear...");
    updateBirthyear({ variables: { name: selectedAuthor, born: parseInt(birthyear) } });

    setSelectedAuthor("");
    setBirthyear("");
  };

  // handle select and input onChange events
  const onAuthorChange = ({ target }) => setSelectedAuthor(target.value);
  const onBirthyearChange = ({ target }) => setBirthyear(target.value);

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {query.data.allAuthors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <select value={selectedAuthor} onChange={onAuthorChange} defaultValue={1}>
          <option value="1" disabled>
            Choose a author
          </option>
          {query.data.allAuthors.map(a => (
            <option key={a.name} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
        <div>
          born
          <input type="number" value={birthyear} onChange={onBirthyearChange} />
        </div>
        <button>update author</button>
      </form>
    </div>
  );
};

export default Authors;
