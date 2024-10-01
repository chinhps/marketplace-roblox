import {
  IBaseResponseDetail,
  IResponseWithMessage,
} from "@/types/response/base.type";
import { EventResponse } from "@/types/response/event.type";
import axiosClient from "@/utils/axiosClient";

export const eventApi = {
  get: () => {
    const url = "/api/events/get_one";
    return axiosClient.get<IBaseResponseDetail<EventResponse>>(url);
  },
  getGhost: () => {
    const url = "/api/events/get_one_ghost";
    return axiosClient.get<IBaseResponseDetail<EventResponse>>(url);
  },
  claim: () => {
    const url = "/api/events/claim";
    return axiosClient.post<IResponseWithMessage>(url);
  },
};
