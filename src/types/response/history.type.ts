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

export interface ServiceHistoryResponse {
  id: number;
  user_id: number;
  service_id: number;
  shop_id: number;
  quantity: number;
  price: number;
  detail: {
    default: string;
    details: IServiceHistoryDetail[];
  };
  created_at: string;
  service: {
    id: number;
    note: number;
  };
  user: {
    id: number;
    shop_id: number;
    provider_id: string;
    name: string;
  };
  shop: {
    id: number;
    stt: number;
    domain: string;
    shop: string;
    created_at: string;
    updated_at: string;
  };
}

export interface IServiceHistoryDetail {
  name: string;
  service_gift_id: number;
}
