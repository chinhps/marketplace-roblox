import { IShopList } from "./shop.type";
import { UserResponse } from "./user.type";

export interface TopRechargeListResponse {
  id: number;
  shop_id: number;
  user_id: number;
  price: number;
  created_at: string;
  updated_at: string;
  name_virtual: string | null;
  user: UserResponse | null;
  shop: IShopList | null;
}
