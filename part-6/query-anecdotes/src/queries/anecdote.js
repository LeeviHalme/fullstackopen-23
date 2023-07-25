import axios from "axios";

const BASE_URL = "http://localhost:3001/anecdotes";

// helper
const getId = () => (100000 * Math.random()).toFixed(0);
const anecdoteAsObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

export const getAll = () => axios.get(BASE_URL).then(res => res.data);
export const getOne = id => axios.get(`${BASE_URL}/${id}`).then(res => res.data);
export const createNew = content =>
  axios.post(BASE_URL, anecdoteAsObject(content)).then(res => res.data);
export const addVote = id =>
  getOne(id).then(data =>
    axios.put(`${BASE_URL}/${id}`, { ...data, votes: data.votes + 1 }).then(res => res.data)
  );
