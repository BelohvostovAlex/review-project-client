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
    fontWeight: "bold",
    alignItems: "center",
    cursor: "pointer",
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
  modeBtn: {
    width: "40px",
    background: props.modeBtnColor,
    marginRight: "20px",
    "&:hover": {
      background: props.modeBtnColorHover,
    },
  },
});
