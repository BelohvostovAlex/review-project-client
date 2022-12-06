import axios, { AxiosRequestConfig } from "axios";

import { API_SERVER_URL } from "../mock/mockUrls";

export const $api = axios.create({
  withCredentials: true,
  baseURL: API_SERVER_URL,
});

$api.interceptors.request.use(
  (
    config: AxiosRequestConfig
  ): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
    config!.headers!.Authorization = `Bearer ${localStorage.getItem("token")}`;

    return config;
  }
);

export default $api;
