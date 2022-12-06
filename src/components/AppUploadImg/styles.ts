interface makeStylesProps {
  drag: boolean;
}

export const makeStyles = (props: makeStylesProps) => ({
  uploadWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: props.drag ? "1px dashed black" : "none",
    padding: "20px 0px",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  uploadTitle: {
    marginRight: "10px",
  },
});
