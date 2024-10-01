import { IResponseWithMessage } from "@/types/response/base.type";
import axiosClient from "@/utils/axiosClient";

export const gamePassApi = {
  buyGamePass: ({ slug, data }: { slug: string; data: object }) => {
    const url = "/api/services/game_pass/" + slug;
    return axiosClient.post<IResponseWithMessage>(url, { ...data });
  },
};
