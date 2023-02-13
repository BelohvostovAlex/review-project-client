import { Suspense, FunctionComponent, lazy } from "react";

import { AppLoader } from "./components/AppLoader";
import { AppTheme } from "./components/AppTheme";

const AppLayout = lazy(() => import("./layout/AppLayout/AppLayout"));
const AppRouter = lazy(() => import("./components/AppRouter/AppRouter"));

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
