import { IFormInput } from "../form.type"
import { IDetail2P } from "./base.type";
import { Shop } from "./service.type";

export interface PluginResponse {
    id: number,
    name: string,
    status: "ON" | "OFF",
    excluding: "ON" | "OFF",
    form_public: Array<IFormInput>,
    created_at: string,
    plugin_key: string,
    shop_list: Shop[] | null;
    data_public: IDetail2P[];
}