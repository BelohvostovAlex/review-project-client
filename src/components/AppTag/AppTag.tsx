import React from "react";

import { Chip } from "@mui/material";

import { AppTagProps, AppTagVariant } from "./interface";
import { makeStyles } from "./styles";

export const AppTag: React.FC<AppTagProps> = ({
  title,
  variant = AppTagVariant.OUTLINED,
  onClick,
  onDelete,
  isDelete = true,
  styles,
}) => {
  const style = makeStyles({ styles });

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
