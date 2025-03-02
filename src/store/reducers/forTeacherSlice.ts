import { createSlice } from '@reduxjs/toolkit';

const forTeacherSlice = createSlice({
  name: 'forTeacher',
  initialState: {
    yearForm:null,
    semestrForm:null
  },
  reducers: {
    setYearForm: (state,action) => {
      state.yearForm = action.payload
    },
    setSemestrForm: (state,action) => {
      state.semestrForm = action.payload
    },
  },
});

export const {  setYearForm,setSemestrForm} = forTeacherSlice.actions;
export default forTeacherSlice.reducer;