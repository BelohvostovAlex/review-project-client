import { Dispatch, SetStateAction } from "react";

interface dialogValue {
  title: string;
}

export interface AppDialogueProps {
  open: boolean;
  dialogueText: string;
  dialogueTitle: string;
  onClick?: () => void;
  onClose?: () => void;
  dialogValue?: dialogValue | null;
  setDialogValue: Dispatch<SetStateAction<{ title: string }>>;
}
