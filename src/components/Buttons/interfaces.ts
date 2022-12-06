import { SxProps } from "@mui/material";

export enum AppButtonVariant {
  OUTLINED = "outlined",
  CONTAINED = "contained",
  TEXT = "text",
}

export enum AppButtonColor {
  ERROR = "error",
  INFO = "info",
  INHERIT = "inherit",
  PRIMARY = "primary",
  WARNING = "warning",
  SUCCESS = "success",
  SECONDARY = "secondary",
}

export type AppButtonType = "button" | "submit" | "reset" | undefined;

export interface AppButtonProps {
  text: string;
  styles?: SxProps;
  variant?: AppButtonVariant;
  color?: AppButtonColor;
  type?: AppButtonType;
  onClick?: () => void;
  disabled?: boolean;
  startIcon?: React.ReactElement;
}

export interface AppButtonLinkProps extends AppButtonProps {
  path: string;
}
