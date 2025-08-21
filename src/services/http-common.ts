import axios, { AxiosResponse } from 'axios';
import authConfig from "src/configs/auth";
import { API_PATH } from "src/utils/const";

export default axios.create({
    baseURL: API_PATH,

    headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`,
    },
}); 