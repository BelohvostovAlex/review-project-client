interface makeStylesProps {
  drawerWidth: string;
  drawerBgColor: string;
}

export const makeStyles = (props: makeStylesProps) => ({
  drawerWrapper: {
    display: { xs: "block", md: "none" },
    "& .MuiDrawer-paper": {
      boxSizing: "border-box",
      width: props.drawerWidth,
      background: props.drawerBgColor,
    },
  },
});
