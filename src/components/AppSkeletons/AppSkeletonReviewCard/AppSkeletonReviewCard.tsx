import { FunctionComponent } from "react";
import ContentLoader from "react-content-loader";

import { useTheme } from "@mui/material";
import { tokens } from "../../../theme/theme";

import { AppSkeletonReviewCardProps } from "./interface";

export const AppSkeletonReviewCard: FunctionComponent<
  AppSkeletonReviewCardProps
> = ({ isFull = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <ContentLoader
      speed={2}
      width={isFull ? "760px" : "340px"}
      height={isFull ? "780px" : "505px"}
      viewBox="0 0 340 505"
      backgroundColor={
        theme.palette.mode === "dark" ? colors.grey[500] : colors.grey[800]
      }
      foregroundColor={
        theme.palette.mode === "dark"
          ? colors.darkGreen[600]
          : colors.primary[600]
      }
    >
      <rect x="16" y="4" rx="0" ry="0" width="308" height="55" />
      <rect x="3" y="72" rx="0" ry="0" width="340" height="160" />
      <rect x="17" y="249" rx="0" ry="0" width="308" height="83" />
      <rect x="8" y="445" rx="0" ry="0" width="75" height="36" />
      <rect x="17" y="345" rx="0" ry="0" width="308" height="65" />
      <rect x="290" y="445" rx="0" ry="0" width="43" height="36" />
    </ContentLoader>
  );
};
