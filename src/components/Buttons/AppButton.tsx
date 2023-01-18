import { FunctionComponent } from "react";

import { Button } from "@mui/material";

import { AppButtonProps, AppButtonVariant } from "./interfaces";
import { makeStyles } from "./styles";

export const AppButton: FunctionComponent<AppButtonProps> = ({
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
