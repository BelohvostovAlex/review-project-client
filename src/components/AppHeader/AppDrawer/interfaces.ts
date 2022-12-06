export type AppDrawerVariant =
  | "temporary"
  | "permanent"
  | "persistent"
  | undefined;

export interface AppDrawerProps {
  children: React.ReactNode;
  drawerWidth?: string;
  variant?: AppDrawerVariant;
  open: boolean;
  onClose: () => void;
}
