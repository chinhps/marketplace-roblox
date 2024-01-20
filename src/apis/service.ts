import { IQueryForm } from "@/types/form.type";
import {
  IBaseResponse,
  IBaseResponseDetail,
  IResponseWithMessage,
} from "@/types/response/base.type";
import {
  IServiceDetailResponse,
  IServiceEdit,
  IServiceGameList,
  IServiceList,
  ServiceGroup,
  ServiceOdds,
} from "@/types/response/service.type";
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
  get: (id: number, idDetail: number) => {
    const url = `/services/${id}/${idDetail}`;
    return axiosClient.get<IBaseResponseDetail<IServiceEdit>>(url);
  },
  serviceGameList: (game_key: string) => {
    const url = "/services/all-list";
    return axiosClient.get<IBaseResponseDetail<Array<IServiceGameList>>>(url, {
      params: {
        game_key,
      },
    });
  },
  list: ({ page, filter }: IQueryForm) => {
    const url = "/services";
    return axiosClient.get<IBaseResponse<IServiceList>>(url, {
      params: {
        page,
        ...filter,
      },
    });
  },
  delete: (id: number) => {
    const url = "/services/" + id;
    return axiosClient.delete<IResponseWithMessage>(url);
  },
  deleteDetail: (id: number) => {
    const url = "/services-detail-list/" + id;
    return axiosClient.delete<IResponseWithMessage>(url);
  },
  listDetail: ({ page, filter }: IQueryForm) => {
    const url = "/services-detail-list";
    return axiosClient.get<IBaseResponse<IServiceDetailResponse>>(url, {
      params: {
        page,
        ...filter,
      },
    });
  },
};

export const serviceGroupApi = {
  list: ({ page, filter }: IQueryForm) => {
    const url = "/services-group-list";
    return axiosClient.get<IBaseResponse<ServiceGroup>>(url, {
      params: {
        page,
        ...filter,
      },
    });
  },
  get: (id: number) => {
    const url = "/services-group-list/" + id;
    return axiosClient.get<IBaseResponseDetail<ServiceGroup>>(url);
  },
  delete: (id: number) => {
    const url = "/services-group-list/" + id;
    return axiosClient.delete<IResponseWithMessage>(url);
  },
  create: (dataForm: FormData) => {
    const url = "/services-group-list/upsert";
    return axiosClient.post<IResponseWithMessage>(url, dataForm, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  },
};

export const serviceOddsApi = {
  list: ({ page, filter }: IQueryForm) => {
    const url = "/services-odds-list";
    return axiosClient.get<IBaseResponse<ServiceOdds>>(url, {
      params: {
        page,
        ...filter,
      },
    });
  },
  delete: (id: number) => {
    const url = "/services-odds-list/" + id;
    return axiosClient.delete<IResponseWithMessage>(url);
  },
};

export const gamePassApi = {
  get: (id: number) => {
    const url = "/game-pass/" + id;
    return axiosClient.get<IBaseResponseDetail<ServiceGroup>>(url);
  },
  delete: (id: number) => {
    const url = "/game-pass/" + id;
    return axiosClient.delete<IResponseWithMessage>(url);
  },
  create: (dataForm: FormData) => {
    const url = "/game-pass/upsert";
    return axiosClient.post<IResponseWithMessage>(url, dataForm, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  },
};
