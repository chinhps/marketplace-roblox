import { IBaseResponseDetail } from "@/types/response/base.type";
import {
  ResponseStatisticalByDomain,
  StatisticalCharts,
  StatisticalRevenue,
  StatisticalService,
} from "@/types/response/statistical.type";
import axiosClient from "@/utils/axiosClient";

export const statisticalApi = {
  service: () => {
    const url = "/statistical/service";
    return axiosClient.get<IBaseResponseDetail<StatisticalService>>(url);
  },
  revenue: () => {
    const url = "/statistical/revenue";
    return axiosClient.get<IBaseResponseDetail<StatisticalRevenue>>(url);
  },
  charts: () => {
    const url = "/statistical/charts";
    return axiosClient.get<IBaseResponseDetail<StatisticalCharts>>(url);
  },
  byDomain: (domain: string, filter: object) => {
    const url = "/statistical/by-domain/" + domain;
    return axiosClient.get<ResponseStatisticalByDomain>(url, {
      params: {
        ...filter,
      },
    });
  },
};
