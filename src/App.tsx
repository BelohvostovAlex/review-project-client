import React from "react";

import { AppRouter } from "./components/AppRouter/AppRouter";
import { AppLayout } from "./layout/AppLayout/AppLayout";

export const App: React.FC = () => {
  return (
    <AppLayout>
      <AppRouter />
    </AppLayout>
  );
};
