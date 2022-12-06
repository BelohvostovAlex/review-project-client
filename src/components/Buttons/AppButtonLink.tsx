import React from "react";
import { Link } from "react-router-dom";

import { Button } from "@mui/material";
import {
  AppButtonColor,
  AppButtonLinkProps,
  AppButtonVariant,
} from "./interfaces";
import { makeStyles } from "./appBtnLinkStyles";

export const AppButtonLink: React.FC<AppButtonLinkProps> = ({
  text,
  path,
  variant = AppButtonVariant.CONTAINED,
  styles,
  color = AppButtonColor.PRIMARY,
  onClick,
}) => {
  const style = makeStyles(styles);
  return (
    <Link to={path}>
      <Button
        variant={variant}
        color={color}
        onClick={onClick}
        sx={style.btnWrapper}
      >
        {text}
      </Button>
    </Link>
  );
};
