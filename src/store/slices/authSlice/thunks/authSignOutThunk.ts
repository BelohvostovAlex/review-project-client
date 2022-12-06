import { createAsyncThunk } from "@reduxjs/toolkit";

import { authServiceSignOut } from "../../../../services/authService/authService";

export const authSignOut = createAsyncThunk(
  "auth/signOut",
  async (_, { rejectWithValue }) => {
    try {
      await authServiceSignOut();

      localStorage.removeItem("token");
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
