import React, { useState } from "react";

import { Alert, Snackbar } from "@mui/material";

import { AppAlertProps, AppAlertSeverity } from "./interface";
import { makeStyles } from "./styles";

export const AppAlert: React.FC<AppAlertProps> = ({
  open,
  severity = AppAlertSeverity.ERROR,
  text,
}) => {
  const [isOpen, setIsOpen] = useState(() => (open ? true : false));
  const handleClose = () => setIsOpen(false);

  const style = makeStyles();
  return (
    <Snackbar
      sx={style.alertWrapper}
      autoHideDuration={4000}
      open={isOpen}
      onClose={handleClose}
    >
      <Alert severity={severity}>{text}</Alert>
    </Snackbar>
  );
};
