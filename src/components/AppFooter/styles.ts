interface makeStylesProps {
  footerBg: string;
  footerIconColor: string;
}

export const makeStyles = (props: makeStylesProps) => ({
  footerWrapper: {
    width: "100%",
    marginTop: "30px",
    display: "flex",
    paddingBottom: "10px",
    paddingTop: "20px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: props.footerBg,
  },
  footerText: {
    fontWeight: "bold",
  },
  footerIcon: {
    color: props.footerIconColor,
    fontSize: "32px",
  },
  footerCopyRightText: {
    marginTop: "10px",
    fontSize: "12px",
  },
});
