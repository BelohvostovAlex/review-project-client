import { SxProps } from "@mui/material";

interface makeStylesProps {
  styles?: SxProps;
}

export const makeStyles = (props: makeStylesProps) => ({
  tag: {
    margin: "5px",
    ...props.styles,
  },
});
