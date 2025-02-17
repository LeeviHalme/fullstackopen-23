import { createSlice } from "@reduxjs/toolkit";
import * as anecdoteService from "../services/anecdotes";

const initialState = [];

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    updateAnecdote: (state, action) => {
      return state.map(item => (item.id === action.payload.id ? action.payload : item));
    },
    insertAnecdote: (state, action) => {
      return [...state, action.payload];
    },
    setAnecdotes: (_, action) => {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const addAnecdote = payload => {
  console.log({ payload });
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(payload);
    dispatch(insertAnecdote(newAnecdote));
  };
};

export const voteForAnecdote = id => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.addVote(id);
    dispatch(updateAnecdote(updatedAnecdote));
  };
};

export const { setAnecdotes, insertAnecdote, updateAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
