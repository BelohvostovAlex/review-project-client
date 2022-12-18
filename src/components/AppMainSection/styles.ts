interface makeStylesProps {
  mainSectionTitleWrapperBg: string;
}

export const makeStyles = (props: makeStylesProps) => ({
  mainSectionTitleWrapper: {
    margin: "10px",
    display: "flex",
    alignItems: "center",
    background: props.mainSectionTitleWrapperBg,
    padding: "10px 20px",
    borderRadius: "5px",
    width: "fit-content",
  },
  mainSectionTitle: {
    fontWeight: "bold",
    marginRight: "20px",
  },
  mainSectionReviewsWrapper: {
    display: "flex",
    alignItems: "start",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
});
