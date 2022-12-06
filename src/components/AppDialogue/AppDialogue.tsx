import React from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";
import { AppButton } from "../Buttons/AppButton";
import { AppDialogueProps } from "./interfaces";

export const AppDialogue: React.FC<AppDialogueProps> = ({
  open,
  onClick,
  setDialogValue,
  dialogValue,
  onClose,
  dialogueText,
  dialogueTitle,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{dialogueTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogueText}</DialogContentText>
        <TextField
          autoFocus
          value={dialogValue?.title}
          onChange={(e) =>
            setDialogValue({
              ...dialogValue,
              title: e.target.value,
            })
          }
          label="title"
          type="text"
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <AppButton onClick={onClose} text="Cancel" />
        <AppButton onClick={onClick} text="Add" />
      </DialogActions>
    </Dialog>
  );
};
