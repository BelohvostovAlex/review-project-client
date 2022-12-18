interface makeStylesProps {
  profileAvaBg: string;
}

export const makeStyles = (props: makeStylesProps) => ({
  profileMenuWrapper: { flexGrow: 0 },
  menuItemsWrapper: {
    marginTop: "45px",
  },
  avaBtn: { padding: 0 },
  profileAva: {
    background: props.profileAvaBg,
  },
});
