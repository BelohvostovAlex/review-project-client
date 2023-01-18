import { FunctionComponent, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

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
import { AppSearch } from "../AppSearch/AppSearch";

import { tokens } from "../../theme/theme";
import { useAppSelector } from "../../hooks/useAppSelector";
import { authSelector } from "../../store/slices/authSlice/authSelectors";
import { useActions } from "../../hooks/useActions";
import { authServiceSignOutWithSocialMedia } from "../../services/authService/authService";
import { useTextHeader } from "./config/useTextHeader";

import { LightModeOutlined, DarkModeOutlined } from "@mui/icons-material";
import { APP_LOGO } from "../../mock/constants";
import { AppPathes } from "../AppRouter/interfaces";
import { AppHeaderProps } from "./interfaces";
import { makeStyles } from "./styles";

export const AppHeader: FunctionComponent<AppHeaderProps> = ({ title }) => {
  const { isAuth, isError, viaSocial } = useAppSelector(authSelector);
  const { authSignOut, changeTheme } = useActions();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const headerText = useTextHeader();

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

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;
    if (!value && !viaSocial) {
      authSignOut();
    }

    if (!value && viaSocial) {
      const response = await authServiceSignOutWithSocialMedia();
      if (response.data === "done") authSignOut();
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
          <Box sx={style.headerTitleWrapper}>
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
          </Box>

          <AppSearch />
          <AppNavMenu />
          {!isAuth ? (
            <Box>
              <AppButtonLink
                path={AppPathes.LOGIN}
                text={headerText.signIn}
                styles={style.headerLoginBtn}
              />
              <AppButtonLink
                path={AppPathes.REGISTRATION}
                text={headerText.signUp}
                styles={style.headerRegisterBtn}
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
                  label={isAuth ? headerText.signOut : headerText.signIn}
                />
              </FormGroup>
              <AppProfileMenu title={headerText.profileTitle} />
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
