import { IFormInput } from "../form.type";
import { IDetail2P } from "./base.type";

export interface EventResponse {
  id: number;
  name: string;
  image: string;
  active: "ON" | "OFF";
  created_at: string;
  updated_at: string;
  form_public: IFormInput[];
  data_public: IDetail2P[];
}
