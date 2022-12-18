export const makeStyles = () => ({
  reviewsPageWrapper: {
    width: "100%",
    padding: "20px",
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
});
