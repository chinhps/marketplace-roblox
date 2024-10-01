import {
  IInfoUserResponse,
  ILoginInput,
  ILoginResponse,
  ILogoutResponse,
} from "@/types/response/auth.type";
import axiosClient from "@/utils/axiosClient";

export const AuthApi = {
  login: ({ username, password, remember }: ILoginInput) => {
    const url = "/auth/login";
    return axiosClient.post<ILoginResponse>(url, {
      username,
      password,
      remember,
    });
  },
  infoUser: () => {
    const url = "/user";
    return axiosClient.get<IInfoUserResponse>(url);
  },
  logout: () => {
    let url = "/auth/logout";
    return axiosClient.post<ILogoutResponse>(url);
  },
};
