import {
  IInfoUserResponse,
  ILinkLoginSocial,
  ILoginInput,
  ILoginResponse,
  ILogoutInput,
  ILogoutResponse,
  IRegisterInput,
  IRegisterResponse,
} from "@/types/response/auth.type";
import axiosClient from "@/utils/axiosClient";

export const AuthApi = {
  login: ({ username, password }: ILoginInput) => {
    const url = "/api/auth/login";
    return axiosClient.post<ILoginResponse>(url, {
      username,
      password,
    });
  },
  register: ({ username, password, password_confirmation }: IRegisterInput) => {
    const url = "/api/auth/register";
    return axiosClient.post<IRegisterResponse>(url, {
      username,
      password,
      password_confirmation,
    });
  },
  infoUser: () => {
    const url = "/api/user";
    return axiosClient.get<IInfoUserResponse>(url);
  },
  logout: ({ typeLogout }: ILogoutInput) => {
    let url = "/api/auth/logout";
    if (typeLogout === "ALL") url += "/all";
    return axiosClient.post<ILogoutResponse>(url);
  },
};

export const loginWith = {
  urlLoginSocial: (login: string) => {
    const url = `/api/auth/login-with/get-sign-in-url`;
    return axiosClient.post<ILinkLoginSocial>(url, {
      login_social: login,
    });
  },
  facebook: (token: string) => {
    const url = `/api/auth/login-with/verified-token-facebook`;
    return axiosClient.post<ILoginResponse>(url, {
      token,
    });
  },
};
