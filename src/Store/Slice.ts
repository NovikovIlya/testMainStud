import { AxiosResponse } from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Services from './../Services/Services';
import { RegResponse } from '../models/response/RegResponse';

export const Reg = createAsyncThunk(
  'Slice/Reg',
  function (
    lastName: string,
    firstName: string,
    middleName: string,
    phone: string,
    password: string,
  ): Promise<AxiosResponse<any>> {
    const responce = Services.registration(
      lastName,
      firstName,
      middleName,
      11,
      true,
      phone,
      password,
    );
    return responce;
  },
);

const Slice = createSlice({
  name: 'Slice',
  initialState: {
    data: {
      StatusOfLoad: 'load',
      persons: [],
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(Reg.pending, (state, action) => {});
  },
});

export const {} = Slice.actions;
export default Slice.reducer;
