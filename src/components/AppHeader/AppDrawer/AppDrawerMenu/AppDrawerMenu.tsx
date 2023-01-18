import { FunctionComponent } from "react";
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

import { useAppSelector } from "../../../../hooks/useAppSelector";
import { authSelector } from "../../../../store/slices/authSlice/authSelectors";
import { tokens } from "../../../../theme/theme";

import { AppDrawerMenuProps } from "./interface";
import { APP_LOGO, APP_NAV_MENU } from "../../../../mock/constants";
import { AppPathes } from "../../../AppRouter/interfaces";
import { makeStyles } from "./styles";

export const AppDrawerMenu: FunctionComponent<AppDrawerMenuProps> = ({
  onClick,
}) => {
  const { isAuth } = useAppSelector(authSelector);
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
        {!isAuth && (
          <>
            <ListItem
              disablePadding
              onClick={() => handleItemOnClick(AppPathes.LOGIN)}
            >
              <ListItemButton sx={style.listItemBtn}>
                <ListItemText primary={t(`AuthButtons.signIn`)} />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              onClick={() => handleItemOnClick(AppPathes.REGISTRATION)}
            >
              <ListItemButton sx={style.listItemBtn}>
                <ListItemText primary={t(`AuthButtons.signUp`)} />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );
};
