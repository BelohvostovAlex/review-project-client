import React, { Suspense, FunctionComponent } from "react";

import { AppLoader } from "./components/AppLoader";
import { AppTheme } from "./components/AppTheme";

const AppLayout = React.lazy(() => import("./layout/AppLayout/AppLayout"));
const AppRouter = React.lazy(() => import("./components/AppRouter/AppRouter"));

export const App: FunctionComponent = () => {
  return (
    <AppTheme>
      <Suspense fallback={<AppLoader open={true} />}>
        <AppLayout>
          <AppRouter />
        </AppLayout>
      </Suspense>
    </AppTheme>
  );
};
