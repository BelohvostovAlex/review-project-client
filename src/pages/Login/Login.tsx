import { FunctionComponent } from "react";

import { Box } from "@mui/material";
import { AuthForm } from "../../components/AuthForm/AuthForm";

import { useActions } from "../../hooks/useActions";

import { authServiceSignInInput } from "../../services/authService/interfaces";
import { makeStyles } from "./styles";

export const Login: FunctionComponent = () => {
  const { authSignIn } = useActions();
  const style = makeStyles();

  const login = (data: authServiceSignInInput) => {
    const { email, password } = data;
    authSignIn({ email, password });
  };

  return (
    <Box component="section" sx={style.loginWrapper}>
      <AuthForm signUp={false} onFormSubmit={login} />
    </Box>
  );
};
