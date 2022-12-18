import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
import { useAppSelector } from "../../../hooks/useAppSelector";
import { stringAvatar } from "../../../helpers/stringAvatar";

import { APP_PROFILE_MENU } from "../../../mock/constants";
import { AppProfileMenuProps } from "./interface";
import { makeStyles } from "./styles";

export const AppProfileMenu: React.FC<AppProfileMenuProps> = ({ title }) => {
  const { user } = useAppSelector((state) => state.auth);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const style = makeStyles({
    profileAvaBg:
      theme.palette.mode === "dark"
        ? colors.lightGreen[500]
        : colors.primary[500],
  });

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (path: string) => {
    setAnchorElUser(null);
    navigate(path);
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
        {APP_PROFILE_MENU.map((item) => (
          <MenuItem
            key={item.text}
            onClick={() => handleCloseUserMenu(item.path)}
          >
            {item.text}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
