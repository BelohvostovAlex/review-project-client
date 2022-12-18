import { SxProps } from "@mui/material";

interface makeStylesProps {
  styles?: SxProps;
}

export const makeStyles = (props: makeStylesProps) => ({
  appButton: {
    ...props.styles,
  },
});
