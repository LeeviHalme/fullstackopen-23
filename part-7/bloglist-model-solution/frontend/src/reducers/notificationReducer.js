import { createSlice } from "@reduxjs/toolkit";

const initialState = { visible: false, message: "", type: "info" };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (_, action) => {
      console.log("GOT ACTION", action);
      const { content, type } = action.payload;
      return { visible: true, message: content, type };
    },
    resetNotification: () => {
      return initialState;
    },
  },
});

export const addNotification = (content, type = "info", time = 5000) => {
  return (dispatch) => {
    dispatch(setNotification({ content, type }));
    setTimeout(() => dispatch(resetNotification()), time);
  };
};

export const { setNotification, resetNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
