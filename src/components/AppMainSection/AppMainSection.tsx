import { FunctionComponent } from "react";

import { Box, Typography, useTheme } from "@mui/material";
import { AppBanner } from "../AppBanner/AppBanner";
import { AppReview } from "../AppReview/AppReview";
import { AppButtonLink } from "../Buttons/AppButtonLink";
import { AppSkeletonReviewCard } from "../AppSkeletons/AppSkeletonReviewCard/AppSkeletonReviewCard";

import { tokens } from "../../theme/theme";
import { useFetchReviews } from "../../hooks/useFetchReviews";

import { AppMainSectionProps } from "./interface";
import { makeStyles } from "./styles";
import { useMainSectionText } from "./config/useMainSectionText";

export const AppMainSection: FunctionComponent<AppMainSectionProps> = ({
  title,
  sort,
  category,
  search,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const reviewsText = useMainSectionText();
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
        <AppButtonLink
          text={reviewsText.button}
          path={`/reviews/all/${sort}`}
        />
      </Box>
      <Box sx={style.mainSectionReviewsWrapper}>
        {!isLoading && reviews.length < 1 && (
          <AppBanner
            title={reviewsText.appBannerTitle}
            text={reviewsText.appBannerText}
          />
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
