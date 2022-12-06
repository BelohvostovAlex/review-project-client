import React from "react";

import {
  Box,
  Toolbar,
  Typography,
  AppBar,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { AppButtonLink } from "../Buttons/AppButtonLink";
import { AppAlert } from "../AppAlert/AppAlert";
import { AppProfileMenu } from "./AppProfileMenu/AppProfileMenu";
import { AppNavMenu } from "./AppNavMenu/AppNavMenu";
import { AppBurgerMenu } from "./AppBurgerMenu/AppBurgerMenu";

import { useAppSelector } from "../../hooks/useAppSelector";
import { useActions } from "../../hooks/useActions";

import { makeStyles } from "./styles";
import { AppHeaderProps } from "./interfaces";
import { AppPathes } from "../AppRouter/interfaces";
import { AppDrawer } from "./AppDrawer/AppDrawer";
import { AppDrawerMenu } from "./AppDrawer/AppDrawerMenu/AppDrawerMenu";

export const AppHeader: React.FC<AppHeaderProps> = ({ title }) => {
  const { isAuth, isError } = useAppSelector((state) => state.auth);
  const { authSignOut } = useActions();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const style = makeStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;
    if (!value) {
      authSignOut();
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={style.headerWrapper}>
      <AppBar sx={style.headerAppBar}>
        <Toolbar>
          <AppBurgerMenu onClick={handleDrawerToggle} />
          <Typography sx={style.headerTitle}>{title}</Typography>
          <AppNavMenu />
          {!isAuth ? (
            <>
              <AppButtonLink path={AppPathes.LOGIN} text="Sign In" />
              <AppButtonLink path={AppPathes.REGISTRATION} text="Sign Up" />
            </>
          ) : (
            <>
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
                  label={isAuth ? "Sign Out" : "Sign In"}
                />
              </FormGroup>
              <AppProfileMenu title="Open profile settings" />
            </>
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
