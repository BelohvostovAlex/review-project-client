import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { authServiceRefreshToken } from "../services/authService/authService";

export const $api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_SERVER_URL,
});

$api.interceptors.request.use(
  (
    config: AxiosRequestConfig
  ): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
    config!.headers!.Authorization = `Bearer ${localStorage.getItem("token")}`;

    return config;
  }
);

$api.interceptors.response.use(
  (config: AxiosResponse) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await authServiceRefreshToken();
        localStorage.setItem("token", response.data.accessToken);

        return $api.request(originalRequest);
      } catch (error) {
        console.log("unathorized");
      }
    }
    throw error;
  }
);

export default $api;
