import { IBaseResponseDetail } from "@/types/response/base.type";
import {
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
};
