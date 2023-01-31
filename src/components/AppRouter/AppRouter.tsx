import { FunctionComponent } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Admin } from "../../pages/Admin";

import { useAppSelector } from "../../hooks/useAppSelector";
import { authSelector } from "../../store/slices/authSlice/authSelectors";

import { publicRoutes, AppPathes } from "./interfaces";

const AppRouter: FunctionComponent = () => {
  const { isAuth, user } = useAppSelector(authSelector);
  const isAdmin = user.role === 1;

  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={<route.element />} />
      ))}
      <Route path="/*" element={<Navigate to={AppPathes.MAIN} />} />
      {isAuth && isAdmin && (
        <Route path={AppPathes.ADMIN} element={<Admin />} />
      )}
    </Routes>
  );
};

export default AppRouter;
