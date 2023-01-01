import { SxProps } from "@mui/material";

export enum AppTagVariant {
  OUTLINED = "outlined",
  FILLED = "filled",
}

export interface AppTagProps {
  title: string;
  isDelete?: boolean;
  variant?: AppTagVariant;
  onDelete?: (tag: string) => void;
  onClick?: () => void;
  styles?: SxProps;
  isActive?: boolean;
}
