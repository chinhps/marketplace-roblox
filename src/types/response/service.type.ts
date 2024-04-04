import { IFormInput } from "../form.type";

export interface IServiceGameList {
  id: number;
  game_id: number;
  service_key: string;
  price: number;
  note: string;
  active: "ON" | "OFF";
  parent_id: number | null;
  private_form: Array<IFormInput>;
  public_form: Array<IFormInput>;
  currency_name?: string;
}

export interface IServiceGameRandomCreate {
  idServiceGame: number;
  listAccount: string;
}

export interface IChest {
  value: number;
  countChest: number;
}

export interface IServiceList {
  id: number;
  service_key: string;
  price: number;
  sale: number;
  notification: string;
  information: { [key: string]: string };
  note: string;
  active: "OFF" | "ON";
  created_at: string;
  private_form: Array<IFormInput>;
  public_form: Array<IFormInput>;
  service_details_count: number;
  currency: Currency | null;
  service_couter: SericeCounter | null;
  service_details?: Array<IServiceDetailResponse>;
  game_list: {
    id: number;
    game_key: string;
    game_name: string;
  };
}

export interface IServiceEdit extends IServiceList {
  service_detail: IServiceDetailResponse;
}

export interface IServiceDetailResponse {
  id: number;
  service_group_id: number;
  service_id: number;
  service_odds_id: number;
  service_image_id: number;
  prioritize: number;
  excluding: "ON" | "OFF";
  created_at: string;
  slug: string;
  service_image: ServiceImage | null;
  service_group: ServiceGroup | null;
  service_odds: ServiceOdds | null;
  shop_list: Shop[] | null;
}

interface ServiceImage {
  id: number;
  thumb: string;
  images: string;
  name: string;
  created_at: string;
}

export interface ServiceGroup {
  id: number;
  prioritize: number;
  name: string;
  active: "ON" | "OFF";
  image: string;
  created_at: string;
}

export interface ServiceOdds {
  id: number;
  odds_admin_type: string;
  odds_admin: string;
  odds_user_type: string;
  odds_user: string;
  created_at: string;
  countUse: number | null;
  service_gifts: Array<Gift>;
  note: string | null;
  service_details?: Array<IServiceDetailResponse>;
}

interface Gift {
  id: number;
  odds_id: number;
  game_currency_id: number;
  gift_type: "FIXED" | "RANDOM";
  image: string | null;
  value1: number;
  value2: number | null;
  vip: "YES" | "NO";
  cost: number;
  percent_random: number;
  text_custom: string | null;
}

export interface Shop {
  id: number;
  stt: number;
  domain: string;
  shop: string;
  created_at: string;
}

interface Currency {
  id: number;
  currency_key: string;
  currency_name: string;
  created_at: string;
  updated_at: string;
}

interface SericeCounter {
  id: number;
  service_id: number;
  value: number;
  created_at: string;
  updated_at: string;
}

export interface ServiceGamePassUpsert {
  msg: string;
  id_odds: number;
  id_service_detail: number;
  type: "UPDATE" | "CREATE";
}
