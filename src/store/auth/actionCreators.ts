import { Dispatch } from "@reduxjs/toolkit";
import { login } from "../../api/auth";

import { ILoginRequest } from "../../api/auth/types";
import {
  loginStart,
  loadProfileSuccess,
  loginFailure,
  loginSuccess,
} from "./authReducer";

export const loginUser =
  (data: ILoginRequest) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(loginStart());
      const res = await login(data);
      dispatch(loginSuccess(res.data.accessToken));
      //dispatch(getProfile())
    } catch (e: any) {
      console.error(e);
      dispatch(loginFailure(e.messages));
    }
  };
