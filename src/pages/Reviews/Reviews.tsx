import React from "react";
import { useParams } from "react-router-dom";

import { Box, Pagination, Stack, Typography } from "@mui/material";
import { AppReview } from "../../components/AppReview/AppReview";
import { AppSkeletonReviewCard } from "../../components/AppSkeletonReviewCard/AppSkeletonReviewCard";

import { useFetchReviews } from "../../hooks/useFetchReviews";

import { makeStyles } from "./styles";

export const Reviews: React.FC = () => {
  const { sort } = useParams();
  const { reviews, total, limit, isLoading, page, likedReview, handlePage } =
    useFetchReviews({
      sort,
    });
  const style = makeStyles();
  return (
    <Box sx={style.reviewsPageWrapper}>
      <Typography sx={style.reviewsPageTitle} variant="h4">
        Check all reviews here
      </Typography>
      <Box sx={style.reviewsWrapper}>
        {isLoading &&
          [1, 2, 3, 4].map((_, i) => <AppSkeletonReviewCard key={i} />)}
        {reviews.map((review) => (
          <AppReview
            review={review}
            likedReview={likedReview}
            key={review._id}
          />
        ))}
      </Box>
      <Stack spacing={2} sx={style.reviewsPageBlock}>
        <Pagination
          count={Math.ceil(total / limit)}
          page={page}
          onChange={handlePage}
        />
      </Stack>
    </Box>
  );
};
