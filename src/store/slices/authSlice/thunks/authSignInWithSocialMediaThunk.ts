import { createAsyncThunk } from "@reduxjs/toolkit";

import { authServiceSignInWithSocialMedia } from "../../../../services/authService/authService";

export const authSignInWithSocialMedia = createAsyncThunk(
  "auth/signInWithSocialMedia",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authServiceSignInWithSocialMedia();

      if (response.data) {
        localStorage.setItem("token", response.data.accessToken);
        return response.data.user;
      }
      throw Error("no any user");
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
