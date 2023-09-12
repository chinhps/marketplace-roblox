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
