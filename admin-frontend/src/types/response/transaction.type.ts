import { UserResponse } from "./user.type";

export interface ITransactionCreate {
  user_id: number;
  currency: "PRICE" | "ROBUX" | "DIAMOND";
  transaction_type: "increase" | "decrease";
  value: number;
  note: string;
}

export interface TransactionListResponse {
  id: number;
  user_id: number;
  value: number;
  note: string;
  created_at: string;
  updated_at: string;
  user: UserResponse | null;
}