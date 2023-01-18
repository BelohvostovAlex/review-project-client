import { useState, MouseEvent, FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  Box,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Stack,
  useTheme,
} from "@mui/material";

import { tokens } from "../../../theme/theme";
import { useActions } from "../../../hooks/useActions";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { authSelector } from "../../../store/slices/authSlice/authSelectors";
import { stringAvatar } from "../../../helpers/stringAvatar";
import { authServiceSignOutWithSocialMedia } from "../../../services/authService/authService";

import { APP_PROFILE_MENU } from "../../../mock/constants";
import { AppProfileMenuProps } from "./interface";
import { makeStyles } from "./styles";

export const AppProfileMenu: FunctionComponent<AppProfileMenuProps> = ({
  title,
}) => {
  const { user, viaSocial } = useAppSelector(authSelector);
  const { authSignOut } = useActions();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();
  const style = makeStyles({
    profileAvaBg:
      theme.palette.mode === "dark"
        ? colors.lightGreen[500]
        : colors.primary[500],
  });

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (path: string) => {
    setAnchorElUser(null);
    navigate(path);
  };

  const signOut = async () => {
    if (!viaSocial) {
      authSignOut();
    }

    if (viaSocial) {
      const response = await authServiceSignOutWithSocialMedia();
      if (response.data === "done") authSignOut();
    }
  };

  return (
    <Box sx={style.profileMenuWrapper}>
      <Tooltip title={title}>
        <IconButton onClick={handleOpenUserMenu} sx={style.avaBtn}>
          <Stack>
            <Avatar sx={style.profileAva}>{stringAvatar(user.username)}</Avatar>
          </Stack>
        </IconButton>
      </Tooltip>
      <Menu
        sx={style.menuItemsWrapper}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={() => setAnchorElUser(null)}
      >
        {user.role !== 1 && (
          <MenuItem onClick={() => handleCloseUserMenu("/profile/" + user.id)}>
            {t(`ProfileMenu.1`)}
          </MenuItem>
        )}
        {user.role === 1 && (
          <MenuItem onClick={() => handleCloseUserMenu("/admin")}>
            {t(`ProfileMenu.2`)}
          </MenuItem>
        )}
        {APP_PROFILE_MENU.map((item, i) => (
          <MenuItem
            key={item.text}
            onClick={() => handleCloseUserMenu(item.path)}
          >
            {t(`ProfileMenu.${i + 3}`)}
          </MenuItem>
        ))}
        <MenuItem onClick={signOut}>{t(`AuthButtons.signOut`)}</MenuItem>
      </Menu>
    </Box>
  );
};
