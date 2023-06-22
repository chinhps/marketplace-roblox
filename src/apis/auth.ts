import {
    IInfoUserResponse,
    ILoginInput,
    ILoginResponse,
    IRegisterInput,
    IRegisterResponse
} from "@/types/response/auth.type";
import axiosClient from "@/utils/axiosClient"
import { myDomain } from "@/utils/version";
import { bearerToken } from "./bearer";

export const AuthApi = {
    login: ({ username, password }: ILoginInput) => {
        const url = "/api/auth/login"
        return axiosClient.post<ILoginResponse>(url, {
            username,
            password,
            domain: myDomain()
        });
    },
    register: ({ username, password, password_confirmation }: IRegisterInput) => {
        const url = "/api/auth/register"
        return axiosClient.post<IRegisterResponse>(url, {
            username,
            password,
            password_confirmation,
            domain: myDomain()
        });
    },
    infoUser: (token: string) => {
        const url = "/api/user";
        return axiosClient.get<IInfoUserResponse>(url, bearerToken(token));
    }
}