import React from "react";

import { Box, Typography } from "@mui/material";

import { AppBannerProps } from "./interface";
import { makeStyles } from "./styles";

export const AppBanner: React.FC<AppBannerProps> = ({ title, text }) => {
  const style = makeStyles();
  return (
    <Box sx={style.bannerWrapper}>
      <Typography sx={style.bannerTitle}>{title}</Typography>
      <Box component="p">{text}</Box>
    </Box>
  );
};
