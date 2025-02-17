import axios from "axios";

const BASE_URL = "http://localhost:3001/anecdotes";

// helper functions
const getId = () => (100000 * Math.random()).toFixed(0);
const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

export const getAll = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const getOne = async id => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const createNew = async content => {
  const data = asObject(content);
  const response = await axios.post(BASE_URL, data);
  return response.data;
};

export const addVote = async id => {
  const anecdote = await getOne(id);
  const response = await axios.put(`${BASE_URL}/${id}`, { ...anecdote, votes: anecdote.votes + 1 });
  return response.data;
};
