import React from "react";

import { Box } from "@mui/material";
import { AppReviewCard } from "../../components/AppReviewCard/AppReviewCard";

import { useAppSelector } from "../../hooks/useAppSelector";
import { useFetchReviews } from "../../hooks/useFetchReviews";

export const Main: React.FC = () => {
  const { reviews } = useAppSelector((state) => state.reviews);
  useFetchReviews();
  return (
    <Box>
      {reviews.map((review) => (
        <AppReviewCard review={review} key={review._id} />
      ))}
    </Box>
  );
};
