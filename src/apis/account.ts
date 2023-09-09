import { IServiceGameRandomCreate } from "@/types/response/service.type";
import axiosClient from "@/utils/axiosClient";

const accountApi = {
  createAccount: (formDataObject: FormData) => {
    const url = "/api/accounts/upsert";
    return axiosClient.post(url, formDataObject, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  },
  createRandom: (data: IServiceGameRandomCreate) => {
    const url = "/api/accounts/create-random";
    return axiosClient.post(url, { ...data });
  },
};
export default accountApi;
