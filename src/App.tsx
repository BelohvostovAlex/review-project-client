import React, { Suspense, useMemo } from "react";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme/theme";

import { AppLoader } from "./components/AppLoader/AppLoader";
import { useAppSelector } from "./hooks/useAppSelector";
import { authSelector } from "./store/slices/authSlice/authSelectors";

const AppLayout = React.lazy(() => import("./layout/AppLayout/AppLayout"));
const AppRouter = React.lazy(() => import("./components/AppRouter/AppRouter"));

export const App: React.FC = () => {
  const { mode } = useAppSelector(authSelector);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<AppLoader open={true} />}>
        <AppLayout>
          <AppRouter />
        </AppLayout>
      </Suspense>
    </ThemeProvider>
  );
};
