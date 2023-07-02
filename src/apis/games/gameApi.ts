import { IBaseResponseDetail } from "@/types/response/base.type";
import { IServiceDetailResponse, IServiceHandle } from "@/types/response/service.type";
import axiosClient from "@/utils/axiosClient";

class GameApi {

    private baseUrl: string;
    private slug: string;

    constructor() {
        this.baseUrl = '/api/services';
        this.slug = "";
    }
    setSlug(slug: string) {
        this.slug = slug;
    }
    // Lấy thông tin của dịch vụ
    getData() {
        const url = this.baseUrl + "/view/" + this.slug;
        return axiosClient.get<IBaseResponseDetail<IServiceDetailResponse>>(url);
    }
    // Chỉ dành cho mua tài khoản
    buyAccout(id: number) {
        const url = this.baseUrl + "/buy_account";
        return axiosClient.post(url, { id, slug: this.slug });
    }
    // Hành động quay (thật)
    postData({ numrolllop }: { numrolllop: number }) {
        const url = this.baseUrl + "/is_play/" + this.slug;
        return axiosClient.post<IBaseResponseDetail<IServiceHandle>>(url, { numrolllop, slug: this.slug })
    }
    // Hành động quay (giả)
    postDataTry({ numrolllop }: { numrolllop: number }) {
        const url = this.baseUrl + "/is_play_try/" + this.slug;
        return axiosClient.post<IBaseResponseDetail<IServiceHandle>>(url, { numrolllop, slug: this.slug })
    }
    // Lấy lịch sử sử dụng dịch vụ(Không lấy mua tài khoản)
    histories() {
        const url = this.baseUrl + "/histories/" + this.slug;
        return axiosClient.get(url);
    }
    // Lấy các dịch vụ gợi ý
    recommends() {
        const url = this.baseUrl + "/recomends/" + this.slug;
        return axiosClient.get(url);
    }
}

export default GameApi