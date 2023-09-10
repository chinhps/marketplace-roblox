import {
    IInfoUserResponse,
    ILoginInput,
    ILoginResponse,
    ILogoutInput,
    ILogoutResponse,
} from "@/types/response/auth.type";
import axiosClient from "@/utils/axiosClient"

export const AuthApi = {
    login: ({ username, password, remember }: ILoginInput) => {
        const url = "/auth/login"
        return axiosClient.post<ILoginResponse>(url, {
            username,
            password,
            remember
        });
    },
    infoUser: () => {
        const url = "/user";
        return axiosClient.get<IInfoUserResponse>(url);
    },
    logout: ({ typeLogout }: ILogoutInput) => {
        let url = "/auth/logout";
        if (typeLogout === "ALL") url += "/all";
        return axiosClient.post<ILogoutResponse>(url);
    }
}