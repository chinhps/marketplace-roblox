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
  user: UserResponse | null;
  shop: IShopList;
}

export interface IServiceHistoryDetail {
  name: string;
  service_gift_id: number;
  msg: string
}

export interface WithdrawHistoryResponse {
  id: number;
  user_id: number;
  shop_id: number;
  task_number: string;
  withdraw_type: WithdrawType;
  value: number;
  cost: number;
  cost_type: number | null;
  status: WithdrawStatus;
  detail: IDetail2P[];
  created_at: string;
  updated_at: string;
  user: UserResponse | null;
  shop: IShopList | null;
}

export enum WithdrawStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  CANCEL = "CANCEL",
  PROCESSING = "PROCESSING",
}

export enum WithdrawType {
  ROBUX = "ROBUX",
  DIAMOND = "DIAMOND",
  BUY_ROBUX = "BUY_ROBUX",
  GAMEPASS = "GAMEPASS",
  UNIT = "UNIT",
  GEMS = "GEMS"
}
