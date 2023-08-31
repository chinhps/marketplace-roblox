import { IServiceMutation } from "@/types/service.type";
import axiosClient from "@/utils/axiosClient";

export const serviceApi = {
  create: ({ formData, data }: IServiceMutation) => {
    formData.append("dataDefault", data ?? "");
    const url = "/api/services-for-all/upsert";
    return axiosClient.post(url, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  },
};
