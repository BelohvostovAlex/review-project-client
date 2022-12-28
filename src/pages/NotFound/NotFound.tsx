import React from "react";

import { Box } from "@mui/material";

import { useNotFoundText } from "./config/useNotFoundText";

import { makeStyles } from "./styles";

export const NotFound: React.FC = () => {
  const notFoundText = useNotFoundText();
  const style = makeStyles();
  return <Box sx={style.notFoundWrapper}>{notFoundText.text}</Box>;
};
