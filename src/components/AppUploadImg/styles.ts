interface makeStylesProps {
  drag: boolean;
  uploadWrapperBorder: string;
}

export const makeStyles = (props: makeStylesProps) => ({
  uploadWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: props.drag
      ? `1px solid ${props.uploadWrapperBorder}`
      : `1px dashed ${props.uploadWrapperBorder}`,
    padding: "20px 0px",
    borderRadius: "5px",
    marginBottom: "10px",
    boxSizing: "border-box",
  },
  uploadTitle: {
    marginRight: "10px",
  },
});
