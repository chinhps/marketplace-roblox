import { IBaseResponse } from "@/types/response/base.type";
import { IServiceGroupResponse } from "@/types/response/service.type";
import axiosClient from "@/utils/axiosClient"

const serviceApi = {
    servieList: () => {
        const api = '/api/services';
        return axiosClient.get<IBaseResponse<IServiceGroupResponse>>(api);
    }
}

export default serviceApi;