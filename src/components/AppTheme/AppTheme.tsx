import { FunctionComponent, useMemo } from "react";

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { themeSettings } from "../../theme/theme";

import { useAppSelector } from "../../hooks/useAppSelector";
import { authSelector } from "../../store/slices/authSlice/authSelectors";

import { AppThemeProps } from "./interfaces";

export const AppTheme: FunctionComponent<AppThemeProps> = ({ children }) => {
  const { mode } = useAppSelector(authSelector);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
