import { IBaseResponse } from "@/types/response/base.type";
import { IServiceGroupResponse, IServiceListResponse } from "@/types/response/service.type";
import axiosClient from "@/utils/axiosClient"

const serviceApi = {
    servieList: () => {
        const api = '/api/services';
        return axiosClient.get<IBaseResponse<IServiceGroupResponse>>(api);
    },
    recommend: (slug: string) => {
        const api = '/api/services/recommends/' + slug;
        return axiosClient.get<IBaseResponse<IServiceListResponse>>(api);
    }
}

export default serviceApi;