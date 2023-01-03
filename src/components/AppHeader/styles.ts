interface makeStylesProps {
  modeBtnColor: string;
  modeBtnColorHover: string;
  headerBg: string;
  headerLogoColor: string;
}

export const makeStyles = (props: makeStylesProps) => ({
  headerWrapper: {
    flexGrow: 1,
  },
  headerTitle: {
    display: { xs: "none", sm: "flex" },
    marginRight: { xs: "none", sm: "20px", lg: "100px" },
    fontWeight: "bold",
    alignItems: "center",
    cursor: "pointer",
  },
  headerTitleWrapper: {
    display: "flex",
    alignItems: "center",
  },
  headerAppBar: {
    position: "fixed",
    background: `${props.headerBg} !important`,
  },
  headerToolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerRightWrapper: {
    display: "flex",
  },
  headerSwitchWrapper: {
    marginRight: "10px",
    display: { xs: "none", md: "inline-block" },
  },
  headerSwitch: {
    "& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": {
      backgroundColor: "#fff",
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "#fff",
    },
  },
  headerLogo: {
    color: props.headerLogoColor,
    fontSize: "24px",
    marginLeft: "10px",
  },
  headerLoginBtn: {
    marginRight: "10px",
    display: { xs: "none", md: "inline-block" },
  },
  headerRegisterBtn: {
    display: { xs: "none", md: "inline-block" },
  },
  modeBtn: {
    width: "40px",
    height: "40px",
    background: props.modeBtnColor,
    marginRight: { xs: "10px", sm: "20px" },
    "&:hover": {
      background: props.modeBtnColorHover,
    },
  },
});
