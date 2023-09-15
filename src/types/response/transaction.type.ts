export interface ITransactionCreate {
  user_id: number;
  currency: "PRICE" | "ROBUX" | "DIAMOND";
  transaction_type: "increase" | "decrease";
  value: number;
  note: string;
}
