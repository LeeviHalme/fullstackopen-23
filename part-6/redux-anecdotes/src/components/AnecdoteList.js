import { useDispatch, useSelector } from "react-redux";
import { voteForAnecdote } from "../reducers/anecdoteReducer";
import { addNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter.toLowerCase());
  const anecdotes = useSelector(state => state.anecdotes);

  const vote = (id, name) => {
    dispatch(voteForAnecdote(id));
    dispatch(addNotification(`you voted '${name}'`, 5));
  };

  return (
    <>
      {anecdotes
        .filter(anecdote => String(anecdote.content).toLowerCase().includes(filter))
        .sort((a, b) => b.votes - a.votes)
        .map(({ id, content, votes }) => (
          <div key={id}>
            <div>{content}</div>
            <div>
              has {votes}
              <button onClick={() => vote(id, content)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};
export default AnecdoteList;
