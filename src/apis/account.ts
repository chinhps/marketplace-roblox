import { IServiceGameCreate } from "@/types/response/service.type";
import axiosClient from "@/utils/axiosClient";

const accountApi = {
  createAccount: ({ idServiceGame, data }: IServiceGameCreate) => {
    const url = "/api/accounts/upsert";
    return axiosClient.post(url, {
      idServiceGame,
      ...data,
    });
  },
};
export default accountApi;
