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
}

export interface IServiceGameRandomCreate {
  idServiceGame: number;
  listAccount: string;
}

export interface IServiceList {
  id: number;
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
}

export interface IServiceDetailResponse {
  id: number;
  service_group_id: number;
  service_id: number;
  service_odds_id: number;
  service_image_id: number;
  prioritize: number;
  excluding: string;
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
  images: {
    [key: string]: string;
  };
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
}

interface Shop {
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
