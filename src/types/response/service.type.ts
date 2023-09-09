import { IFormInput } from "../form.type";

export interface IServiceGameList {
  id: number;
  game_id: number;
  service_key: string;
  price: number;
  note: string;
  active: "ON" | "OFF";
  parent_id: number | null;
  private_form: Array<IFormInput>;
  public_form: Array<IFormInput>;
}

export interface IServiceGameRandomCreate {
  idServiceGame: number;
  listAccount: string;
}
