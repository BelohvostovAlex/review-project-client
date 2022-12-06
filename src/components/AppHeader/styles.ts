export const makeStyles = () => ({
  headerWrapper: {
    flexGrow: 1,
  },
  headerTitle: { flexGrow: 1, display: { xs: "none", sm: "block" } },
  headerAppBar: {
    position: "fixed",
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
});
