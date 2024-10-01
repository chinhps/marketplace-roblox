import { IQueryForm } from "@/types/form.type";
import { IBaseResponse, IBaseResponseDetail } from "@/types/response/base.type";
import { EventResponse } from "@/types/response/event.type";
import axiosClient from "@/utils/axiosClient";

export const eventApi = {
  list: ({ page, filter }: IQueryForm) => {
    const url = "/events";
    return axiosClient.get<IBaseResponse<EventResponse>>(url, {
      params: {
        page,
        ...filter,
      },
    });
  },
  get: (id: number) => {
    const url = "/events/" + id;
    return axiosClient.get<IBaseResponseDetail<EventResponse>>(url);
  },
  upsert: (data: FormData) => {
    const url = "/events/upsert";
    return axiosClient.post(url, data, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  },
};
