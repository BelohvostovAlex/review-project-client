import React from "react";

import { Box, Typography } from "@mui/material";

import { AppReviewCardProps } from "./interface";
import { makeStyles } from "./styles";
import { useGetUser } from "../../hooks/useGetUser";

export const AppReviewCard: React.FC<AppReviewCardProps> = ({ review }) => {
  const style = makeStyles();
  const {
    _id,
    artItem,
    category,
    createdAt,
    creator,
    grade,
    image,
    likes,
    tags,
    text,
    title,
    updatedAt,
  } = review;

  const user = useGetUser(creator);

  return (
    <Box>
      <Typography>{title}</Typography>
      <Typography>{user && user.username}</Typography>
      <Box component="img" src={image} />
    </Box>
  );
};
