import { SxProps } from "@mui/material";

export const makeStyles = (props: SxProps<{}> | undefined) => ({
  btnWrapper: {
    ...props,
  },
});
