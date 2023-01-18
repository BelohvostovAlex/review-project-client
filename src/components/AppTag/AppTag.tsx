import { FunctionComponent } from "react";

import { Chip, useTheme } from "@mui/material";

import { tokens } from "../../theme/theme";

import { AppTagProps, AppTagVariant } from "./interface";
import { makeStyles } from "./styles";

export const AppTag: FunctionComponent<AppTagProps> = ({
  title,
  variant = AppTagVariant.OUTLINED,
  onClick,
  onDelete,
  isDelete = true,
  styles,
  isActive,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const style = makeStyles({ styles, isActive, activeBg: colors.grey[700] });

  return (
    <Chip
      label={`#${title}`}
      variant={variant}
      onDelete={!isDelete ? undefined : onDelete}
      onClick={onClick}
      sx={style.tag}
    />
  );
};
