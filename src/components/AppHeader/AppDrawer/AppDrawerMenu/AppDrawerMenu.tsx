import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
} from "@mui/material";

import { APP_LOGO, APP_NAV_MENU } from "../../../../mock/constants";
import { tokens } from "../../../../theme/theme";

import { AppDrawerMenuProps } from "./interface";
import { makeStyles } from "./styles";

export const AppDrawerMenu: React.FC<AppDrawerMenuProps> = ({ onClick }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const style = makeStyles({
    AppDrawerLogoColor:
      theme.palette.mode === "dark"
        ? colors.lightGreen[500]
        : colors.primary[500],
  });

  const handleItemOnClick = (path: string) => {
    navigate(path);
  };
  return (
    <Box onClick={onClick} sx={style.appDrawerMenuWrapper}>
      <APP_LOGO sx={style.appDrawerLogo} />
      <Divider />
      <List>
        {APP_NAV_MENU.map((item, i) => (
          <ListItem
            key={item.text}
            disablePadding
            onClick={() => handleItemOnClick(item.path)}
          >
            <ListItemButton sx={style.listItemBtn}>
              <ListItemText primary={t(`NavButtons.${i}`)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
