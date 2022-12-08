import React from "react";

import { Box } from "@mui/material";
import { AppReviewCard } from "../../components/AppReviewCard/AppReviewCard";

import { useAppSelector } from "../../hooks/useAppSelector";
import { useFetchReviews } from "../../hooks/useFetchReviews";

import { makeStyles } from "./styles";
import { AppBanner } from "../../components/AppBanner/AppBanner";

export const Main: React.FC = () => {
  const { reviews } = useAppSelector((state) => state.reviews);

  const style = makeStyles();
  useFetchReviews();
  return (
    <Box sx={style.mainLastCreatedWrapper}>
      {reviews.length < 1 && (
        <AppBanner title="No reviews" text="Please create one.." />
      )}
      {reviews &&
        reviews.map((review) => (
          <AppReviewCard review={review} key={review._id} />
        ))}
    </Box>
  );
};
