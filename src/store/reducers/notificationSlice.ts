import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: null,
    type: null,
    status: true
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
    changeStatus: (state) => {
      state.status = false
    },
    changeStatusTrue: (state) => {
      state.status = true
    }
  },
});

export const { showNotification, hideNotification,changeStatus,changeStatusTrue } = notificationSlice.actions;
export default notificationSlice.reducer;