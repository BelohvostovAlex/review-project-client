import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { getReviewsThunk } from "./thunks/getReviewsThunk";

import { ReviewState } from "./interfaces";
import { IReview } from "../../../models/IReview";

const initialState: ReviewState = {
  reviews: [] as IReview[],
  isLoading: false,
  isError: "",
};

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getReviewsThunk.fulfilled,
      (state, action: PayloadAction<IReview[]>) => {
        state.reviews = action.payload;
        state.isError = "";
        state.isLoading = false;
      }
    );
    builder.addCase(getReviewsThunk.pending, (state) => {
      state.isError = "";
      state.isLoading = true;
    });
    builder.addCase(getReviewsThunk.rejected, (state, action) => {
      state.reviews = [] as IReview[];
      state.isError = action.payload || "Error with fetching reviews";
      state.isLoading = false;
    });
  },
});

// export const {} = authSlice.actions;

export default reviewSlice.reducer;
