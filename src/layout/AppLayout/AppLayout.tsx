import { FunctionComponent } from "react";

import { Box } from "@mui/material";
import { AppHeader } from "../../components/AppHeader";
import { AppFooter } from "../../components/AppFooter";

import { APP_TITLE } from "../../mock/constants";

import { AppLayoutProps } from "./interface";
import { makeStyles } from "./styles";

const AppLayout: FunctionComponent<AppLayoutProps> = ({ children }) => {
  const style = makeStyles();
  return (
    <Box sx={style.appLayoutWrapper}>
      <AppHeader title={APP_TITLE} />
      <Box sx={style.appLayoutChildrenWrapper}>{children}</Box>
      <AppFooter text={APP_TITLE + " App"} />
    </Box>
  );
};

export default AppLayout;
