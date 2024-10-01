import { IQueryForm } from "@/types/form.type";
import { IBaseResponse, IBaseResponseDetail } from "@/types/response/base.type";
import { PluginResponse } from "@/types/response/plugin.type";
import axiosClient from "@/utils/axiosClient";

const pluginApi = {
    list: ({ page, filter }: IQueryForm) => {
        const url = "/plugins";
        return axiosClient.get<IBaseResponse<PluginResponse>>(url, {
            params: {
                page,
                ...filter,
            },
        });
    },
    get: (id: number) => {
        const url = "/plugins/" + id;
        return axiosClient.get<IBaseResponseDetail<PluginResponse>>(url);
    },
    upsert: (data: object) => {
        const url = "/plugins/upsert";
        return axiosClient.post(url, { ...data });
    }
}

export { pluginApi }