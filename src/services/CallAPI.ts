import { API_PATH } from "src/utils/const";
import useAxios, { Options } from "axios-hooks";
import { AxiosRequestConfig } from "axios";
import authConfig from "src/configs/auth";

export const CallAPI = <T>(config: AxiosRequestConfig, options?: Options) =>
  useAxios<T>(
    {
      baseURL: API_PATH,
      method: "GET",
      ...config,
      headers: {
        // "Content-Type": "application/json",
        "Authorization":`Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`,
        ...(config?.headers || {}),
      },
      data: config.data || {},
    },
    { ...options, useCache: false }
  );
