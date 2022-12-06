import { AxiosResponse } from "axios";
import $api from "../../http";

import { AUTH_URLS } from "../../mock/mockUrls";
import { AuthResponse } from "../../models/response/AuthResponse";
import { authServiceSignInInput, authServiceSignUpInput } from "./interfaces";

export const authServiceSignUp = async (
  data: authServiceSignUpInput
): Promise<AxiosResponse<AuthResponse>> => {
  const { email, password, username } = data;
  return $api.post<AuthResponse>(AUTH_URLS.SIGNUP, {
    email,
    password,
    username,
  });
};

export const authServiceSignIn = async (
  data: authServiceSignInInput
): Promise<AxiosResponse<AuthResponse>> => {
  const { email, password } = data;
  return $api.post<AuthResponse>(AUTH_URLS.SIGNIN, { email, password });
};

export const authServiceSignOut = async (): Promise<void> => {
  return $api.post(AUTH_URLS.SIGNOUT);
};
