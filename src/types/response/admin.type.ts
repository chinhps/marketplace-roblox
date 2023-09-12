export interface AdminResponse {
  id: number;
  admin_type: string;
  name: string;
  username: string;
  block: "off" | "on";
  active: "off" | "on";
  created_at: "off" | "on";
  user_id: string | null;
  purchase_histories_sum_price: number | null;
  accounts_count: number;
  shop: {
    id: number;
    domain: string;
  } | null;
}
