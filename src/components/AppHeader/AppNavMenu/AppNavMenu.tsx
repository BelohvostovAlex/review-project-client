import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { Box } from "@mui/material";
import { AppButtonLink } from "../../Buttons/AppButtonLink";

import { APP_NAV_MENU } from "../../../mock/constants";
import { makeStyles } from "./styles";

export const AppNavMenu: FunctionComponent = () => {
  const { t } = useTranslation();
  const style = makeStyles();
  return (
    <Box sx={style.navWrapper} component="nav">
      {APP_NAV_MENU.map((item, i) => (
        <AppButtonLink
          key={item.text}
          path={item.path}
          text={t(`NavButtons.${i}`)}
        />
      ))}
    </Box>
  );
};
