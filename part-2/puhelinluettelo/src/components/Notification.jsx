const notificationStyle = {
  padding: "1rem",
  borderRadius: "5px",
  margin: "0.5rem 0",
  border: "2px solid darkgrey",
  color: "white",
  background: "grey",
};

const errorStyle = {
  ...notificationStyle,
  background: "firebrick",
  borderColor: "darkred",
};

const successStyle = {
  ...notificationStyle,
  background: "forestgreen",
  border: "green",
};

const Notification = ({ text, error }) => {
  // If no text was provided, hide the notification
  if (!text) {
    return null;
  }

  return <div style={error ? errorStyle : successStyle}>{text}</div>;
};

export default Notification;
