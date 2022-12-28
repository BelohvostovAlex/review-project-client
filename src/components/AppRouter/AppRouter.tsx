import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Admin } from "../../pages/Admin/Admin";

import { useAppSelector } from "../../hooks/useAppSelector";

import { publicRoutes, AppPathes } from "./interfaces";

const AppRouter: React.FC = () => {
  const { isAuth, isLoading, isError, user } = useAppSelector(
    (state) => state.auth
  );

  console.log("isAuth", isAuth);
  console.log("isLoading", isLoading);
  console.log("isError", isError);
  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={<route.element />} />
      ))}
      <Route path="/*" element={<Navigate to={AppPathes.MAIN} />} />
      {isAuth && user.role == 1 && (
        <Route path={AppPathes.ADMIN} element={<Admin />} />
      )}
    </Routes>
  );
};

export default AppRouter;
