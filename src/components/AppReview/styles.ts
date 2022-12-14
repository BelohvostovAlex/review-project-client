interface makeStylesProps {
  isFull: boolean | undefined;
  cardTitleColor: string;
}

export const makeStyles = ({ isFull, cardTitleColor }: makeStylesProps) => ({
  cardWrapper: {
    width: isFull ? "100%" : "340px",
    height: "auto",
    minHeight: "578.5px",
    margin: isFull ? "10px 0px" : "10px",
  },
  cardTitleWrapper: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  cardTitle: {
    width: "100%",
    display: "flex",
    alignItems: "start",
    justifyContent: "space-between",
    fontSize: isFull ? "36px" : "inherit",
    color: cardTitleColor,
    margin: "10px 0px",
  },
  cardTitleRating: {
    marginLeft: "10px",
    display: "flex",
    alignItems: "center",
  },
  cardActionsWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardCategory: {
    fontSize: isFull ? "18px" : "inherit",
  },
  cardGrade: {
    fontSize: isFull ? "18px" : "inherit",
    marginBottom: isFull ? "10px" : "",
  },
  cardText: {
    fontSize: isFull ? "16px" : "inherit",
    margin: isFull ? "20px 0px" : "10px 0px",
  },
  cardContent: {
    minHeight: isFull ? "200px" : "364px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardTagsWrapper: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
  },
  cardImg: {
    height: isFull ? "360px" : "140px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  cardReviewCreatorWrapper: {
    display: "flex",
    alignItems: "center",
  },
  cardReviewCreatorIcon: {
    fontSize: "16px",
    marginLeft: "3px",
  },
});
