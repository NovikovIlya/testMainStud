import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: null,
    type: null,
  },
  reducers: {
    showNotification: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hideNotification: (state) => {
      state.message = null;
      state.type = null;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;