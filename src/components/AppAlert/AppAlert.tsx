import { useState, FunctionComponent } from "react";

import { Alert, Snackbar } from "@mui/material";

import { AppAlertProps, AppAlertSeverity } from "./interface";
import { makeStyles } from "./styles";

export const AppAlert: FunctionComponent<AppAlertProps> = ({
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
      autoHideDuration={2000}
      open={isOpen}
      onClose={handleClose}
    >
      <Alert severity={severity}>{text}</Alert>
    </Snackbar>
  );
};
