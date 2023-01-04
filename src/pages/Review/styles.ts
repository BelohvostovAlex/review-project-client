export const makeStyles = () => ({
  reviewWrapper: {
    width: { xs: "98vw", sm: "60vw" },
    margin: "0 auto",
    paddingTop: { xs: "40px", sm: "20px" },
  },
  relatedReviews: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    alignItems: { xs: "center", sm: "start" },
    flexWrap: "wrap",
  },
  reviewBackBtn: {
    position: "fixed",
    top: { xs: "70px", sm: "13vh" },
    left: { xs: "1vh", sm: "10vh" },
    zIndex: "100",
  },
  relatedReviewsTitle: {
    textAlign: "center",
    marginTop: "40px",
    marginBottom: "20px",
  },
  commentsBlockWrapper: {
    margin: "20px 0px",
  },
  commentsBlockTitle: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "20px",
    marginBottom: "10px",
  },
  commentForm: {
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    width: "60%",
  },
  commentTextField: {
    width: "100%",
    marginBottom: "10px",
  },
});
