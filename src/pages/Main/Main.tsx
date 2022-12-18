import React from "react";

import { Box } from "@mui/material";
import { AppMainSection } from "../../components/AppMainSection/AppMainSection";

import { makeStyles } from "./styles";

export const Main: React.FC = () => {
  const style = makeStyles();
  return (
    <Box sx={style.mainWrapper}>
      <AppMainSection title="The Most Recent" sort="updatedAt" />
      <AppMainSection title="The Most Rated" sort="rating" />
    </Box>
  );
};
