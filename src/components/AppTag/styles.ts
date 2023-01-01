import { SxProps } from "@mui/material";

interface makeStylesProps {
  styles?: SxProps;
  isActive: boolean | undefined;
  activeBg: string;
}

export const makeStyles = (props: makeStylesProps) => ({
  tag: {
    margin: "5px",
    background: props.isActive ? props.activeBg : "inherit",
    ...props.styles,
  },
});
