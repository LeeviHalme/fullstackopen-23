import { useState } from "react";
import PropTypes from "prop-types";

const Togglable = ({ visibleText, hiddenText, children }) => {
  const [visible, setVisible] = useState(false);

  const onClick = () => setVisible(state => !state);

  return (
    <div style={{ margin: "1rem 0" }}>
      {visible && children}
      <button onClick={onClick}>{visible ? visibleText : hiddenText}</button>
    </div>
  );
};

Togglable.propTypes = {
  visibleText: PropTypes.string.isRequired,
  hiddenText: PropTypes.string.isRequired,
};

export default Togglable;
