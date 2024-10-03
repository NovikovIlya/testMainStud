import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: null,
    type: null,
    status: true,
    place:null,
    text:null,
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
    },
    setText:(state,action)=>{
      state.text=action.payload
    }
  },
});

export const { showNotification, hideNotification,changeStatus,changeStatusTrue,setText } = notificationSlice.actions;
export default notificationSlice.reducer;