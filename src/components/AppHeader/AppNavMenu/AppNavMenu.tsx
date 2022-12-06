import React from "react";

import { Box } from "@mui/material";
import { AppButtonLink } from "../../Buttons/AppButtonLink";

import { APP_NAV_MENU } from "../../../mock/constants";
import { makeStyles } from "./styles";

export const AppNavMenu: React.FC = () => {
  const style = makeStyles();
  return (
    <Box sx={style.navWrapper} component="nav">
      {APP_NAV_MENU.map((item) => (
        <AppButtonLink key={item.text} path={item.path} text={item.text} />
      ))}
    </Box>
  );
};
