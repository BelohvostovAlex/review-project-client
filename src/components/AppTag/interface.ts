export enum AppTagVariant {
  OUTLINED = "outlined",
  FILLED = "filled",
}

export interface AppTagProps {
  title: string;
  variant?: AppTagVariant;
  onClick?: (tag: string) => void;
  isTagTitle?: boolean;
}
