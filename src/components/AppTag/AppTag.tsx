import React from "react";

import { Chip } from "@mui/material";

import { AppTagProps, AppTagVariant } from "./interface";

export const AppTag: React.FC<AppTagProps> = ({
  title,
  variant = AppTagVariant.OUTLINED,
  onClick,
}) => {
  return <Chip label={title} variant={variant} onDelete={onClick} />;
};
