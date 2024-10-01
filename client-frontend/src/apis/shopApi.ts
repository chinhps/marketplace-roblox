import { IBaseResponseDetail } from "@/types/response/base.type";
import { IShopInformation } from "@/types/response/shop.type";
import axiosClient from "@/utils/axiosClient";

export const shopApi = {
    infomation: () => {
        const url = "/api/information";
        return axiosClient.get<IBaseResponseDetail<IShopInformation>>(url);
    }
}