import React from "react";

import { Box } from "@mui/material";
import { AppHeader } from "../../components/AppHeader/AppHeader";

import { AppLayoutProps } from "./interface";
import { makeStyles } from "./styles";
import { APP_HEADER_TITLE } from "../../mock/constants";

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const style = makeStyles();
  return (
    <Box sx={style.appLayoutWrapper}>
      <AppHeader title={APP_HEADER_TITLE} />
      <Box sx={style.appLayoutChildrenWrapper}>{children}</Box>
    </Box>
  );
};
