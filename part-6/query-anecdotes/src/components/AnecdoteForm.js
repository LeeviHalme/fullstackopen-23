import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createNew } from "../queries/anecdote";

import NotificationContext from "../contexts/NotificationContext";

const AnecdoteForm = () => {
  const [, notificationDispatch] = useContext(NotificationContext);
  const queryClient = useQueryClient();
  const createNewMutation = useMutation(createNew, {
    onSuccess: data => {
      queryClient.invalidateQueries("anecdotes");
      notificationDispatch({ type: "SET", payload: `anecdote '${data.content}' created` });
      setTimeout(() => notificationDispatch({ type: "REMOVE" }), 5000);
    },
    onError: error => {
      // if this was our own server's error
      if (error?.response?.data?.error) {
        notificationDispatch({ type: "SET", payload: error.response.data.error });
        setTimeout(() => notificationDispatch({ type: "REMOVE" }), 5000);
      }
    },
  });

  const onCreate = event => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    createNewMutation.mutate(content);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
