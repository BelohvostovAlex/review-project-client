import React from "react";

import { Box, Typography } from "@mui/material";
import { ReviewForm } from "../../components/ReviewForm/ReviewForm";

import { makeStyles } from "./styles";

export const NewReview: React.FC = () => {
  const style = makeStyles();
  return (
    <Box sx={style.newReviewWrapper}>
      <Typography sx={style.newReviewTitle}>Create a review</Typography>
      <ReviewForm />
    </Box>
  );
};
