import { createAsyncThunk } from "@reduxjs/toolkit";

import { authServiceSignIn } from "../../../../services/authService/authService";
import { authServiceSignInInput } from "../../../../services/authService/interfaces";

export const authSignIn = createAsyncThunk(
  "auth/signIn",
  async (authData: authServiceSignInInput, { rejectWithValue }) => {
    try {
      const { data } = await authServiceSignIn(authData);

      localStorage.setItem("token", data.accessToken);

      return data.user;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
