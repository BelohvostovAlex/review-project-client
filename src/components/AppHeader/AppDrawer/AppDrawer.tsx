import React from "react";

import { Drawer } from "@mui/material";

import { AppDrawerProps } from "./interfaces";
import { makeStyles } from "./styles";

export const AppDrawer: React.FC<AppDrawerProps> = ({
  children,
  open,
  onClose,
  drawerWidth = "240px",
  variant = "temporary",
}) => {
  const style = makeStyles({ drawerWidth });
  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      sx={style.drawerWrapper}
    >
      {children}
    </Drawer>
  );
};
