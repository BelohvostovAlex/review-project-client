import { createAsyncThunk } from "@reduxjs/toolkit";

import { authServiceSignUp } from "../../../../services/authService/authService";
import { authServiceSignUpInput } from "../../../../services/authService/interfaces";

export const authSignUp = createAsyncThunk(
  "auth/signUp",
  async (registerData: authServiceSignUpInput, { rejectWithValue }) => {
    try {
      const { data } = await authServiceSignUp(registerData);

      localStorage.setItem("token", data.accessToken);

      return data.user;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
