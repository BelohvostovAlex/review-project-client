import { SxProps } from "@mui/material";

interface makeStylesProps {
  styles?: SxProps;
}

export const makeStyles = (props: makeStylesProps) => ({
  backBtnWrapper: {
    paddingRight: "5px",
    paddingLeft: "15px",
    minWidth: "30px",
    display: "flex",
    ...props.styles,
  },
});
