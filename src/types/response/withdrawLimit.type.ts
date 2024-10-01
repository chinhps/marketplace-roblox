import { UserResponse } from "./user.type";

export interface WithdrawResponse {
  id: number;
  user_id: number;
  withdraw_type_id: number;
  withdraw_limit: number;
  active: "ON" | "OFF";
  created_at: string;
  updated_at: string;
  user_withdraw_sum_value: number;
  user: UserResponse;
  withdraw_type: WithdrawType;
}

export interface WithdrawType {
  id: number;
  type_key: string;
  name: string;
  created_at: string | null;
  updated_at: string | null;
}
