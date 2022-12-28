import React, { useEffect } from "react";

import { Box } from "@mui/material";
import { authServiceGetUsers } from "../../services/authService/authService";

export const Admin = () => {
  const getUsers = async () => {
    const response = await authServiceGetUsers();
    console.log(response.data);
  };
  useEffect(() => {
    getUsers();
  }, []);
  return <Box>Admin</Box>;
};
