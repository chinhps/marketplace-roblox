import { IQueryForm } from "@/types/form.type";
import { IBaseResponse, IBaseResponseDetail } from "@/types/response/base.type";
import { UserResponse } from "@/types/response/user.type";
import axiosClient from "@/utils/axiosClient";

export const userApi = {
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
};
