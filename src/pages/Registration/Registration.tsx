import React from "react";

import { Box } from "@mui/material";
import { AuthForm } from "../../components/AuthForm/AuthForm";

import { useActions } from "../../hooks/useActions";

import { authServiceSignUpInput } from "../../services/authService/interfaces";
import { makeStyles } from "./styles";

export const Registration: React.FC = () => {
  const { authSignUp } = useActions();
  const style = makeStyles();

  const register = (data: authServiceSignUpInput) => {
    const { email, username, password } = data;
    authSignUp({ email, password, username });
  };
  return (
    <Box component="section" sx={style.registerWrapper}>
      <AuthForm onFormSubmit={register} />
    </Box>
  );
};
