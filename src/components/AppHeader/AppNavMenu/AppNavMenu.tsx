import React from "react";
import { useTranslation } from "react-i18next";

import { Box } from "@mui/material";
import { AppButtonLink } from "../../Buttons/AppButtonLink";

import { APP_NAV_MENU } from "../../../mock/constants";
import { makeStyles } from "./styles";

export const AppNavMenu: React.FC = () => {
  const { t } = useTranslation();
  const style = makeStyles();
  return (
    <Box sx={style.navWrapper} component="nav">
      {APP_NAV_MENU.map((item) => (
        <AppButtonLink
          key={item.text}
          path={item.path}
          text={t(`${item.text}.1`)}
        />
      ))}
    </Box>
  );
};
