import React from "react";
import { useParams } from "react-router-dom";

import { Box } from "@mui/material";

import { useGetCurrentReview } from "../../hooks/useGetCurrentReview";

import { ReviewProps } from "./interface";
import { makeStyles } from "./styles";

export const Review: React.FC<ReviewProps> = () => {
  const style = makeStyles();
  const { id } = useParams();
  console.log(id);
  const currentReview = useGetCurrentReview(id!);
  console.log(currentReview);
  return <Box sx={style.reviewWrapper}>Review</Box>;
};
