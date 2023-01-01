import React from "react";

import ContentLoader from "react-content-loader";

import { useTheme } from "@mui/material";
import { tokens } from "../../../theme/theme";

export const AppSkeletonTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ContentLoader
      speed={2}
      width={1180}
      height={505}
      viewBox="0 0 1180 505"
      backgroundColor={
        theme.palette.mode === "dark" ? colors.grey[500] : colors.grey[800]
      }
      foregroundColor={
        theme.palette.mode === "dark"
          ? colors.darkGreen[600]
          : colors.primary[600]
      }
    >
      <rect x="0" y="0" rx="0" ry="0" width="1180" height="58" />
      <rect x="0" y="73" rx="0" ry="0" width="1180" height="58" />
      <rect x="0" y="146" rx="0" ry="0" width="1180" height="58" />
      <rect x="0" y="219" rx="0" ry="0" width="1180" height="58" />
      <rect x="0" y="292" rx="0" ry="0" width="1180" height="58" />
      <rect x="0" y="365" rx="0" ry="0" width="1180" height="58" />
      <rect x="0" y="438" rx="0" ry="0" width="1180" height="58" />
    </ContentLoader>
  );
};
