import { IBaseResponseDetail } from "@/types/response/base.type";
import { IPluginAll } from "@/types/response/plugin.type";
import axiosClient from "@/utils/axiosClient";

export const pluginApi = {
    all: () => {
        const url = "/api/plugins/all";
        return axiosClient.get<IBaseResponseDetail<IPluginAll>>(url);
    }
}