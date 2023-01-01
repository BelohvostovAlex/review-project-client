import axios, { AxiosResponse } from "axios";
import $api from "../../http";

import { AUTH_URLS } from "../../mock/mockUrls";
import { IUser } from "../../models/IUser";
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

export const authServiceSignInWithSocialMedia = async (): Promise<
  AxiosResponse<AuthResponse>
> => {
  return $api.get<AuthResponse>(AUTH_URLS.GET_USER_SOCIAL_MEDIA);
};

export const authServiceSignOut = async (): Promise<void> => {
  return $api.post(AUTH_URLS.SIGNOUT);
};

export const authServiceSignOutWithSocialMedia = async (): Promise<
  AxiosResponse<string>
> => {
  return $api.get(AUTH_URLS.SIGNOUT_WITH_SOCIAL_MEDIA);
};

export const authServiceGetUser = async (
  id: string
): Promise<AxiosResponse<IUser>> => {
  return $api.get(AUTH_URLS.GET_USER_BY_ID + id);
};

export const authServiceRefreshToken = async (): Promise<
  AxiosResponse<AuthResponse>
> => {
  return axios.get(process.env.REACT_APP_SERVER_URL + AUTH_URLS.REFRESH_TOKEN, {
    withCredentials: true,
  });
};
