import { FunctionComponent } from "react";

import { AppBackDrop } from "../AppBackDrop";
import { Box, CircularProgress } from "@mui/material";

import { AppLoaderProps } from "./interface";
import { makeStyles } from "./styles";

export const AppLoader: FunctionComponent<AppLoaderProps> = ({ open }) => {
  const style = makeStyles();
  return (
    <AppBackDrop open={open}>
      <Box sx={style.loaderWrapper}>
        <CircularProgress />
      </Box>
    </AppBackDrop>
  );
};
