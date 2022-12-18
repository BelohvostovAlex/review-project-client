import React from "react";

import { Chip } from "@mui/material";

import { AppTagProps, AppTagVariant } from "./interface";
import { makeStyles } from "./styles";

export const AppTag: React.FC<AppTagProps> = ({
  title,
  variant = AppTagVariant.OUTLINED,
  onClick,
}) => {
  const style = makeStyles();

  return (
    <Chip label={title} variant={variant} onDelete={onClick} sx={style.tag} />
  );
};
