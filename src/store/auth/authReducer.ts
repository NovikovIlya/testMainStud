import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
  authData: {
    accessToken: string | null;
    isLoading: boolean;
    error: string | null;
  };
  profileData: {
    profile: string | null;
    isLoading: boolean;
    error: string | null;
  };
}

const initialState: IAuthState = {
  authData: {
    accessToken: null,
    error: null,
    isLoading: false,
  },
  profileData: {
    error: null,
    isLoading: false,
    profile: null,
  },
};

export const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state): IAuthState => ({
      ...state,
      authData: {
        ...state.authData,
        isLoading: true,
      },
    }),
    loginSuccess: (state, action: PayloadAction<string>): IAuthState => ({
      ...state,
      authData: {
        ...state.authData,
        accessToken: action.payload,
        isLoading: false,
        error: null,
      },
    }),
    loginFailure: (state, action: PayloadAction<string>): IAuthState => ({
      ...state,
      authData: {
        ...state.authData,
        accessToken: action.payload,
        isLoading: false,
        error: action.payload,
      },
    }),
    loadProfileStart: (state): IAuthState => ({
      ...state,
      profileData: {
        ...state.profileData,
        isLoading: true,
      },
    }),
    loadProfileSuccess: (state, action: PayloadAction<string>): IAuthState => ({
      ...state,
      profileData: {
        ...state.profileData,
        profile: action.payload,
        isLoading: false,
        error: null,
      },
    }),
    loadProfileFailure: (state, action: PayloadAction<string>): IAuthState => ({
      ...state,
      profileData: {
        ...state.profileData,
        isLoading: false,
        error: action.payload,
      },
    }),
    logoutSuccess: (): IAuthState => initialState,
  },
});

export const {
  loadProfileFailure,
  loadProfileStart,
  loadProfileSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  logoutSuccess,
} = authReducer.actions;

export default authReducer.reducer;
