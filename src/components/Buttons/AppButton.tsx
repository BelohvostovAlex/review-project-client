import React from "react";

import { Button } from "@mui/material";

import { makeStyles } from "./styles";
import { AppButtonProps, AppButtonVariant } from "./interfaces";

export const AppButton: React.FC<AppButtonProps> = ({
  color,
  styles,
  variant = AppButtonVariant.CONTAINED,
  type = "button",
  text = "Submit",
  disabled,
  startIcon,
  onClick,
  size = "medium",
}) => {
  const style = makeStyles({ styles });
  return (
    <Button
      variant={variant}
      type={type}
      onClick={onClick}
      color={color}
      disabled={disabled}
      startIcon={startIcon}
      size={size}
      sx={style.appButton}
    >
      {text}
    </Button>
  );
};
