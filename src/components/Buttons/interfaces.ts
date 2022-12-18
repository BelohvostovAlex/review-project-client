import { SxProps } from "@mui/material";
import { DefaultTFuncReturn } from "i18next";
import { IReview } from "../../models/IReview";

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

export type AppButtonSize = "small" | "large" | "medium";
export type AppButtonType = "button" | "submit" | "reset" | undefined;

export interface AppButtonProps {
  text: string | React.ReactElement | DefaultTFuncReturn;
  styles?: SxProps;
  variant?: AppButtonVariant;
  color?: AppButtonColor;
  type?: AppButtonType;
  onClick?: () => void;
  disabled?: boolean;
  startIcon?: React.ReactElement;
  size?: AppButtonSize;
}

export interface AppButtonLinkProps extends AppButtonProps {
  path: string;
  state?: IReview;
}
