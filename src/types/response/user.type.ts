import { IShopList } from "./shop.type";

export interface UserResponse {
  id: number;
  shop_id: number;
  provider_id: string;
  name: string;
  username: string;
  price_temporary: number;
  diamond_temporary: number;
  robux_temporary: number;
  block: "on" | "off";
  active: "on" | "off";
  created_at: string;
  updated_at: string;
  login_type: string;
  transactions_price_sum_price: number | null;
  transactions_diamond_sum_diamond: number | null;
  transactions_robux_sum_robux: number | null;
  shop: IShopList;
  admin: AdminResponse | null;
}

interface AdminResponse {
  id: number;
  shop_id: number;
  admin_type: "KOC";
  name: string;
  username: string;
  block: "off" | "on";
  active: "on" | "off";
  created_at: "2023-07-31T12:58:54.000000Z";
  user_id: number | null;
}
