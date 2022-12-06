import React from "react";

import { Backdrop } from "@mui/material";

import { AppBackDropProps } from "./interface";

export const AppBackDrop: React.FC<AppBackDropProps> = ({ children, open }) => {
  return (
    <Backdrop
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: "rgba(0,0,0,0.1)",
      }}
      open={open}
    >
      {children}
    </Backdrop>
  );
};
