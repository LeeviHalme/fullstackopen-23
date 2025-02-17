import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getAll, addVote } from "../queries/anecdote";

import NotificationContext from "../contexts/NotificationContext";

const AnecdoteList = () => {
  const [, notificationDispatch] = useContext(NotificationContext);
  const queryClient = useQueryClient();
  const anecdoteQuery = useQuery("anecdotes", getAll, { retry: false });
  const addVoteMutation = useMutation(addVote, {
    onSuccess: data => {
      queryClient.invalidateQueries("anecdotes");
      notificationDispatch({ type: "SET", payload: `anecdote '${data.content}' voted` });
      setTimeout(() => notificationDispatch({ type: "REMOVE" }), 5000);
    },
  });
  const handleVote = id => addVoteMutation.mutate(id);

  if (anecdoteQuery.status === "loading") {
    return <p>loading...</p>;
  } else if (anecdoteQuery.status === "error") {
    return <p>anecdote service not available due problems in the server</p>;
  }

  return (
    <>
      {anecdoteQuery.data.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};
export default AnecdoteList;
