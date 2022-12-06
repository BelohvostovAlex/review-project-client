import React from "react";

import { Box } from "@mui/material";

import { makeStyles } from "./styles";

export const NotFound: React.FC = () => {
  const style = makeStyles();
  return <Box sx={style.notFoundWrapper}>NotFound</Box>;
};
