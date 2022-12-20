export const makeStyles = () => ({
  reviewsPageWrapper: {
    width: "100%",
    padding: "20px",
  },
  reviewsTitleWrapper: {
    display: "flex",
    alignItems: "center",
  },
  reviewsPageTitle: {
    margin: "10px",
  },
  reviewsWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    flexWrap: "wrap",
  },
  reviewsPageBlock: {
    marginTop: "20px",
    "& .MuiPagination-ul": {
      justifyContent: "center",
    },
  },
  reviewsBackBtn: {
    marginLeft: "10px",
  },
});
