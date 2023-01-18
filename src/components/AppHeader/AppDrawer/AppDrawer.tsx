import { FunctionComponent } from "react";

import { Drawer, useTheme } from "@mui/material";

import { tokens } from "../../../theme/theme";

import { AppDrawerProps } from "./interfaces";
import { makeStyles } from "./styles";

export const AppDrawer: FunctionComponent<AppDrawerProps> = ({
  children,
  open,
  onClose,
  drawerWidth = "240px",
  variant = "temporary",
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const style = makeStyles({ drawerWidth, drawerBgColor: colors.grey[800] });
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
