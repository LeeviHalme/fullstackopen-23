import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [login, result] = useMutation(LOGIN, {
    // on error update the error message
    onError: e => setError(e.graphQLErrors[0].message),
  });

  // onChange event handlers for username and password
  const onUsernameChange = ({ target }) => setUsername(target.value);
  const onPasswordChange = ({ target }) => setPassword(target.value);

  const submit = async event => {
    event.preventDefault();
    console.log("logging in...");

    login({ variables: { username, password } });

    setUsername("");
    setPassword("");
  };

  // set token to localStorage as soon as
  // we get it from the server
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      localStorage.setItem("library-token", token);
      props.setToken(token);
      props.setPage("authors");
    }
  }, [result.data]);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return "logging in...";
  }

  return (
    <div>
      <h2>login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={submit}>
        <div>
          username
          <input type="text" value={username} onChange={onUsernameChange} />
        </div>
        <div>
          password
          <input type="password" value={password} onChange={onPasswordChange} />
        </div>
        <button>login</button>
      </form>
    </div>
  );
};

export default Login;
