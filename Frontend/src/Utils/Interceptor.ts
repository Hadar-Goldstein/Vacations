import axios, { InternalAxiosRequestConfig } from "axios";
import { userService } from "../Services/UserService";
import { notify } from "./Notify";

class Interceptor {
    public create(): void {
        axios.interceptors.request.use((requestConfig: InternalAxiosRequestConfig) => {
            const token = localStorage.getItem("token");
            requestConfig.headers.Authorization = "Bearer " + token;
            return requestConfig;
        });

        axios.interceptors.response.use(
            response => response,
            err => {
                if (err.response?.status === 401) {
                    userService.logout();
                    notify.error("Session has expired. Please login.")
                }
                return Promise.reject(err);
            }
        );
    }
}

export const interceptor = new Interceptor();
