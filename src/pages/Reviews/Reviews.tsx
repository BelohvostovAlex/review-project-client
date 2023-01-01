import React from "react";
import { useParams } from "react-router-dom";

import { Box, Pagination, Stack, Typography } from "@mui/material";
import { AppReview } from "../../components/AppReview/AppReview";
import { AppSkeletonReviewCard } from "../../components/AppSkeletons/AppSkeletonReviewCard/AppSkeletonReviewCard";
import { AppButtonBack } from "../../components/Buttons/AppButtonBack/AppButtonBack";

import { useFetchReviews } from "../../hooks/useFetchReviews";

import { makeStyles } from "./styles";
import { useReviewText } from "./config/useReviewText";

export const Reviews: React.FC = () => {
  const { sort } = useParams();
  const { reviews, total, limit, isLoading, page, likedReview, handlePage } =
    useFetchReviews({
      sort,
    });
  const reviewText = useReviewText();
  const style = makeStyles();

  return (
    <Box sx={style.reviewsPageWrapper}>
      <Box sx={style.reviewsTitleWrapper}>
        <AppButtonBack styles={style.reviewsBackBtn} />
        <Typography sx={style.reviewsPageTitle} variant="h4">
          {reviewText.title}
        </Typography>
      </Box>
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
