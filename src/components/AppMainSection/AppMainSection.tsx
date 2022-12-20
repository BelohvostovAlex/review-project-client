import React from "react";

import { Box, Typography, useTheme } from "@mui/material";
import { AppBanner } from "../AppBanner/AppBanner";
import { AppReview } from "../AppReview/AppReview";
import { AppButtonLink } from "../Buttons/AppButtonLink";
import { AppSkeletonReviewCard } from "../AppSkeletonReviewCard/AppSkeletonReviewCard";

import { tokens } from "../../theme/theme";
import { useFetchReviews } from "../../hooks/useFetchReviews";

import { AppMainSectionProps } from "./interface";
import { makeStyles } from "./styles";

export const AppMainSection: React.FC<AppMainSectionProps> = ({
  title,
  sort,
  category,
  search,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const style = makeStyles({ mainSectionTitleWrapperBg: colors.grey[700] });

  const { reviews, isLoading, likedReview } = useFetchReviews({
    sort,
    category,
    search,
  });
  return (
    <>
      <Box sx={style.mainSectionTitleWrapper}>
        <Typography sx={style.mainSectionTitle} variant="h3">
          {title}
        </Typography>
        <AppButtonLink text="Check More" path={"/reviews/all" + `/${sort}`} />
      </Box>
      <Box sx={style.mainSectionReviewsWrapper}>
        {!isLoading && reviews.length < 1 && (
          <AppBanner title="No reviews" text="Please create one.." />
        )}
        {isLoading &&
          [1, 2, 3, 4].map((_, i) => <AppSkeletonReviewCard key={i} />)}
        {!isLoading &&
          reviews &&
          reviews.map((review) => (
            <AppReview
              review={review}
              key={review._id}
              likedReview={likedReview}
            />
          ))}
      </Box>
    </>
  );
};
