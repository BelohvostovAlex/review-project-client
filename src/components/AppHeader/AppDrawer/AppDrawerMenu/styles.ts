interface makeStylesProps {
  AppDrawerLogoColor: string;
}

export const makeStyles = (props: makeStylesProps) => ({
  appDrawerMenuWrapper: { textAlign: "center" },
  appDrawerTitle: { my: 2 },
  listItemBtn: { textAlign: "center" },
  appDrawerLogo: {
    margin: "10px",
    color: props.AppDrawerLogoColor,
    fontSize: "32px",
  },
});
