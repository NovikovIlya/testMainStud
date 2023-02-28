import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Services from './../Services/Services';
import { RegResponse } from '../models/response/RegResponse';

type obj = {
  message: string | number;
};

type Answer = {
  id: Array<obj>;
};

type InitialState = {
  StatusOfLoad: string;
  persons: Answer;
  error: string;
};

export const Reg = createAsyncThunk<Answer, RegResponse>('Slice/Reg', async (data: RegResponse) => {
  try {
    const response = Services.registration(
      data.lastName,
      data.firstName,
      data.middleName,
      data.registrationPurposeCode,
      data.agreement,
      data.phone,
      data.password,
    );

    return (await response).data;
  } catch (err: any) {
    return err.message;
  }
});

const state: InitialState = {
  StatusOfLoad: 'non',
  persons: {
    id: [],
  },
  error: '',
};

const Slice = createSlice({
  name: 'Slice',
  initialState: state,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(Reg.pending, (state) => {
      state.StatusOfLoad = 'loading';
    });
    builder.addCase(Reg.fulfilled, (state, action) => {
      state.StatusOfLoad = 'installed';
      console.log(action.payload.id);
      state.persons.id = action.payload.id;
    });
  },
});

// export const {} = Slice.actions;
export default Slice.reducer;
