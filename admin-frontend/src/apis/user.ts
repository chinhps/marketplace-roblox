import { IQueryForm } from "@/types/form.type";
import { ISildeBar } from "@/types/layout";
import {
  IBaseResponse,
  IBaseResponseData,
  IBaseResponseDetail,
  IResponseWithMessage,
} from "@/types/response/base.type";
import { UserResponse } from "@/types/response/user.type";
import axiosClient from "@/utils/axiosClient";

export const userApi = {
  navbar: () => {
    const url = "/navbar";
    return axiosClient.get<IBaseResponseData<ISildeBar>>(url);
  },
  list: ({ page, filter }: IQueryForm) => {
    const url = "/users";
    return axiosClient.get<IBaseResponse<UserResponse>>(url, {
      params: {
        page,
        ...filter,
      },
    });
  },
  get: (id: number) => {
    const url = "/users/" + id;
    return axiosClient.get<IBaseResponseDetail<UserResponse>>(url);
  },
  blockUser: (id: number, block: boolean) => {
    const url = "/users/" + id;
    return axiosClient.put<IResponseWithMessage>(url, { block });
  },
};
