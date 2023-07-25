import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (_, action) => {
      return action.payload;
    },
    removeNotification: () => {
      return "";
    },
  },
});

export const addNotification = (content, seconds) => {
  console.log(content);
  return dispatch => {
    dispatch(setNotification(content));
    setTimeout(() => dispatch(removeNotification()), seconds * 1000);
  };
};

export const { setNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
