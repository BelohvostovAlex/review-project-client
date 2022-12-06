import { createAsyncThunk } from "@reduxjs/toolkit";

import { reviewServiceGetReviews } from "../../../../services/reviewService/reviewService";

export const getReviewsThunk = createAsyncThunk(
  "review/getReviews",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await reviewServiceGetReviews();

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
