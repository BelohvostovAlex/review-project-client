export const makeStyles = () => ({
  reviewFormWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: { xs: "96%", sm: "50vw" },
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
    flexDirection: { xs: "column", sm: "row" },
    alignItems: "center",
    marginBottom: "20px",
  },
  reviewZeroGradeBtn: {
    marginTop: { xs: "10px", sm: "0px" },
    height: "33px",
  },
});
