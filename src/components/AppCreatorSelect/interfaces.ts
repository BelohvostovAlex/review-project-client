import { SelectChangeEvent } from "@mui/material";

export interface AppCreatorSelectProps {
  value: string;
  onChange: (e: SelectChangeEvent) => void;
}
