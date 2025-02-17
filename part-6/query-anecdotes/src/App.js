import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import { NotificationContextProvider } from "./contexts/NotificationContext";

const App = () => {
  return (
    <NotificationContextProvider>
      <div>
        <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm />
        <AnecdoteList />
      </div>
    </NotificationContextProvider>
  );
};

export default App;
