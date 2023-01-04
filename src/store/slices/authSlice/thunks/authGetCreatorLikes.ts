import { createAsyncThunk } from "@reduxjs/toolkit";

import { reviewServiceGetCreatorLikes } from "../../../../services/reviewService/reviewService";

export const authGetCreatorLikes = createAsyncThunk(
  "auth/getCreatorLikes",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await reviewServiceGetCreatorLikes(id);

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
