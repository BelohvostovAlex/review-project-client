import React from "react";

import { Button } from "@mui/material";

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
}) => {
  return (
    <Button
      variant={variant}
      type={type}
      onClick={onClick}
      color={color}
      disabled={disabled}
      startIcon={startIcon}
    >
      {text}
    </Button>
  );
};
