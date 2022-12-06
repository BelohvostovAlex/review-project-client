import React from "react";
import { useGoogleLogin } from "@react-oauth/google";

import { AppButton } from "../Buttons/AppButton";
import { authGoogleApi } from "../../services/authGoogleApi";

import GoogleIcon from "@mui/icons-material/Google";

export const AuthGoogle = () => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        console.log(tokenResponse.access_token.length);
        const data = await authGoogleApi(tokenResponse.access_token);
        console.log("data", data);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <AppButton
      startIcon={<GoogleIcon />}
      text="Sign In with Google"
      onClick={login}
    />
  );
};
