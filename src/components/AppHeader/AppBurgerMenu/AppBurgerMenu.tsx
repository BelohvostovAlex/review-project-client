import React from "react";

import { IconButton } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { AppBurgerMenuProps } from "./interface";
import { makeStyles } from "./styles";

export const AppBurgerMenu: React.FC<AppBurgerMenuProps> = ({ onClick }) => {
  const style = makeStyles();
  return (
    <IconButton
      aria-label="open drawer"
      edge="start"
      onClick={onClick}
      sx={style.burgerBtn}
    >
      <MenuIcon />
    </IconButton>
  );
};
