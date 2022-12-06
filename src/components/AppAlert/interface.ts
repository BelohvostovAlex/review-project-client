export enum AppAlertSeverity {
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
  SUCCESS = "success",
}

export interface AppAlertProps {
  severity?: AppAlertSeverity;
  text: string;
  open: boolean;
}
