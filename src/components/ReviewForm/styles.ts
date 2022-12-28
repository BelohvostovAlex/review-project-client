export const makeStyles = () => ({
  reviewFormWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "50vw",
    margin: "0 auto",
  },
  textField: {
    margin: "20px 0",
    width: "100%",
  },
  tagsWrapper: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    padding: "15px 0px",
  },
  reviewImageWrapper: {
    width: "70%",
    height: "auto",
    position: "relative",
  },
  reviewImage: {
    width: "100%",
    position: "relative",
  },
  reviewImageBtn: {
    position: "absolute",
    top: "10px",
    right: "10px",
    minWidth: "fit-content",
  },
  reviewRatingWrapper: {
    display: "flex",
  },
});
