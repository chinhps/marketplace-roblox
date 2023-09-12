import { AdminResponse } from "./admin.type";
import { IDetail2P } from "./base.type";
import { IShopList } from "./shop.type";
import { UserResponse } from "./user.type";

export interface PurchaseResponse {
  id: number;
  user_id: number;
  admin_id: number;
  account_id: number;
  shop_id: number;
  refund: "NO" | "YES";
  price: number;
  created_at: string;
  detail_public: Array<IDetail2P>;
  detail_private: Array<IDetail2P>;
  admin: AdminResponse | null;
  shop: IShopList | null;
  user: UserResponse | null;
}

export interface RechargeResponse {
  id: number;
  user_id: number;
  shop_id: number;
  recharge_id: number;
  detail: Array<IDetail2P>;
  refund: "no" | "yes";
  price: number;
  task_number: string;
  status: "PENDING" | "ERROR" | "SUCCESS";
  ip: string;
  created_at: string;
  updated_at: string;
  recharge: {
    id: number;
    recharge_name: string;
  } | null;
  user: UserResponse | null;
  shop: IShopList | null;
}
