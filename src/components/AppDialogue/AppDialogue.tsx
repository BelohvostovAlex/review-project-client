import { FunctionComponent } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";
import { AppButton } from "../Buttons/AppButton";

import { useDialogText } from "./config/useDialogText";

import { AppDialogueProps } from "./interfaces";

export const AppDialogue: FunctionComponent<AppDialogueProps> = ({
  open,
  onClick,
  setDialogValue,
  dialogValue,
  onClose,
  dialogueText,
  dialogueTitle,
}) => {
  const textInfo = useDialogText();
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
          label={textInfo.title}
          type="text"
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <AppButton onClick={onClose} text={textInfo.buttons.cancel} />
        <AppButton onClick={onClick} text={textInfo.buttons.add} />
      </DialogActions>
    </Dialog>
  );
};
