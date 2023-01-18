import { FunctionComponent } from "react";

import { Box, Typography, useTheme } from "@mui/material";

import { tokens } from "../../theme/theme";
import { useFooterText } from "./config/useFooterText";

import { APP_LOGO } from "../../mock/constants";
import { FooterProps } from "./interface";
import { makeStyles } from "./styles";

export const AppFooter: FunctionComponent<FooterProps> = ({ text }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const textInfo = useFooterText();
  const style = makeStyles({
    footerBg: colors.grey[700],
    footerIconColor:
      theme.palette.mode === "dark"
        ? colors.lightGreen[500]
        : colors.primary[500],
  });
  return (
    <Box component="footer" sx={style.footerWrapper}>
      <APP_LOGO sx={style.footerIcon} />
      <Typography sx={style.footerText}>{text}</Typography>
      <Typography sx={style.footerCopyRightText}>
        {textInfo.footerTitle}
      </Typography>
    </Box>
  );
};
