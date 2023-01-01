import React from "react";
import { useTranslation } from "react-i18next";

import { Chip, Divider, Box } from "@mui/material";

import { AppDividerProps } from "./interface";
import { makeStyles } from "./styles";

export const AppDivider: React.FC<AppDividerProps> = ({ title }) => {
  const { t } = useTranslation();
  const style = makeStyles();
  const text = !title && t("Divider.title");
  return (
    <Box sx={style.dividerWrapper}>
      <Divider sx={style.divider}>{text}</Divider>
    </Box>
  );
};
