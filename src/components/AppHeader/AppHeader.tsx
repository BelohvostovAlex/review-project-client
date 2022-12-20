import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  Box,
  Toolbar,
  Typography,
  AppBar,
  FormGroup,
  FormControlLabel,
  Switch,
  useTheme,
  IconButton,
} from "@mui/material";
import { AppButtonLink } from "../Buttons/AppButtonLink";
import { AppAlert } from "../AppAlert/AppAlert";
import { AppProfileMenu } from "./AppProfileMenu/AppProfileMenu";
import { AppNavMenu } from "./AppNavMenu/AppNavMenu";
import { AppBurgerMenu } from "./AppBurgerMenu/AppBurgerMenu";
import { AppDrawer } from "./AppDrawer/AppDrawer";
import { AppDrawerMenu } from "./AppDrawer/AppDrawerMenu/AppDrawerMenu";
import { AppLangSelect } from "../AppLangSelect/AppLangSelect";

import { tokens } from "../../theme/theme";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useActions } from "../../hooks/useActions";

import { LightModeOutlined, DarkModeOutlined } from "@mui/icons-material";
import { APP_LOGO } from "../../mock/constants";
import { AppPathes } from "../AppRouter/interfaces";
import { AppHeaderProps } from "./interfaces";
import { makeStyles } from "./styles";
import { AppSearch } from "../AppSearch/AppSearch";

export const AppHeader: React.FC<AppHeaderProps> = ({ title }) => {
  const { isAuth, isError } = useAppSelector((state) => state.auth);
  const { authSignOut, changeTheme } = useActions();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const style = makeStyles({
    modeBtnColor: colors.grey[800],
    modeBtnColorHover: colors.grey[600],
    headerBg: colors.grey[700],
    headerLogoColor:
      theme.palette.mode === "dark"
        ? colors.lightGreen[500]
        : colors.primary[500],
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;
    if (!value) {
      authSignOut();
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleColorMode = () => {
    changeTheme();
  };

  return (
    <Box sx={style.headerWrapper}>
      <AppBar sx={style.headerAppBar}>
        <Toolbar sx={style.headerToolbar}>
          <AppBurgerMenu onClick={handleDrawerToggle} />
          <Typography
            sx={style.headerTitle}
            onClick={() => navigate(AppPathes.MAIN)}
          >
            {title}
            {<APP_LOGO sx={style.headerLogo} />}
          </Typography>
          <IconButton onClick={toggleColorMode} sx={style.modeBtn}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined />
            ) : (
              <LightModeOutlined />
            )}
          </IconButton>
          <AppLangSelect />
          <AppSearch />
          <AppNavMenu />
          {!isAuth ? (
            <Box>
              <AppButtonLink
                path={AppPathes.LOGIN}
                text={t("HeaderButtons.1")}
              />
              <AppButtonLink
                path={AppPathes.REGISTRATION}
                text={t("HeaderButtons.2")}
              />
            </Box>
          ) : (
            <Box sx={style.headerRightWrapper}>
              <FormGroup sx={style.headerSwitchWrapper}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isAuth}
                      onChange={handleChange}
                      aria-label="login switch"
                      sx={style.headerSwitch}
                    />
                  }
                  label={isAuth ? t("HeaderButtons.3") : t("HeaderButtons.2")}
                />
              </FormGroup>
              <AppProfileMenu title={t("ProfileMenu.1")} />
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <AppDrawer
        children={<AppDrawerMenu onClick={handleDrawerToggle} />}
        onClose={handleDrawerToggle}
        open={mobileOpen}
      />
      {isError && <AppAlert text={isError} open={!!isError} />}
    </Box>
  );
};
