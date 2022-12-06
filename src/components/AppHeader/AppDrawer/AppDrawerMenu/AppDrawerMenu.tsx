import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { APP_HEADER_TITLE, APP_NAV_MENU } from "../../../../mock/constants";
import { AppDrawerMenuProps } from "./interface";
import { makeStyles } from "./styles";

export const AppDrawerMenu: React.FC<AppDrawerMenuProps> = ({ onClick }) => {
  const navigate = useNavigate();
  const style = makeStyles();

  const handleItemOnClick = (path: string) => {
    navigate(path);
  };
  return (
    <Box onClick={onClick} sx={style.appDrawerMenuWrapper}>
      <Typography variant="h6" sx={style.appDrawerTitle}>
        {APP_HEADER_TITLE}
      </Typography>
      <Divider />
      <List>
        {APP_NAV_MENU.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
            onClick={() => handleItemOnClick(item.path)}
          >
            <ListItemButton sx={style.listItemBtn}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
