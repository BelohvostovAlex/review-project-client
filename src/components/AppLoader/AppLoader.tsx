import React from "react";

import { AppBackDrop } from "../AppBackDrop/AppBackDrop";
import { Box, CircularProgress } from "@mui/material";

import { AppLoaderProps } from "./interface";
import { makeStyles } from "./styles";

export const AppLoader: React.FC<AppLoaderProps> = ({ open }) => {
  const style = makeStyles();
  return (
    <AppBackDrop open={open}>
      <Box sx={style.loaderWrapper}>
        <CircularProgress />
      </Box>
    </AppBackDrop>
  );
};
