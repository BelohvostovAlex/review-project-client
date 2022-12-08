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

interface likedReviewPayload {
  id: string;
  userId: string;
}

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    likedReview: (state, action: PayloadAction<likedReviewPayload>) => {
      const { id, userId } = action.payload;
      const currentReview = state.reviews.find((review) => review._id === id);
      if (currentReview!.likes.includes(userId)) {
        currentReview!.likes = currentReview!.likes.filter(
          (like) => like !== userId
        );
      } else {
        currentReview?.likes.push(userId);
      }
    },
  },
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
      state.reviews = [] as IReview[];
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

export const { likedReview } = reviewSlice.actions;

export default reviewSlice.reducer;
