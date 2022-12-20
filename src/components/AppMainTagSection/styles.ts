interface makeStylesProps {
  tagSectionTitleWrapperBg: string;
}

export const makeStyles = (props: makeStylesProps) => ({
  tagSectionWrapper: {},
  tagSectionTitle: {
    margin: "10px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    background: props.tagSectionTitleWrapperBg,
    padding: "10px 20px",
    borderRadius: "5px",
    width: "fit-content",
  },
  tagSectionTagsWrapper: {
    display: "flex",
    alignItems: "start",
    flexWrap: "wrap",
  },
  tag: {
    padding: "5px 10px",
    fontSize: "18px",
    cursor: "pointer",
  },
});
