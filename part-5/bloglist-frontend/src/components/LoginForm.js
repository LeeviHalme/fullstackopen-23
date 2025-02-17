import { useState } from "react";
import PropTypes from "prop-types";

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = event => {
    event.preventDefault();
    handleLogin({ username, password });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label style={{ marginRight: "0.5rem" }}>Username</label>
          <input
            type="text"
            value={username}
            name="Username"
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label style={{ marginRight: "0.85rem" }}>Password</label>
          <input
            type="password"
            value={password}
            name="Password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="login-btn" style={{ margin: "1rem 0" }}>
          login
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
