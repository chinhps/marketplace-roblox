import { IBaseResponseDetail } from "@/types/response/base.type";
import { IServiceGameList } from "@/types/response/service.type";
import { IServiceMutation } from "@/types/service.type";
import axiosClient from "@/utils/axiosClient";

export const serviceApi = {
  create: ({ formData, data }: IServiceMutation) => {
    formData.append("dataDefault", data ?? "");
    const url = "/services-for-all/upsert";
    return axiosClient.post(url, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  },
  serviceGameList: (game_key: string) => {
    const url = "/services/all-list";
    return axiosClient.get<IBaseResponseDetail<Array<IServiceGameList>>>(url, {
      params: {
        game_key,
      },
    });
  },
};
