import { IDetail2P } from "./base.type";

export interface AccountListResponse {
  id: number;
  prioritize: number;
  admin_id: number;
  service_id: number;
  detail_public: IDetail2P[];
  detail_private: IDetail2P[];
  price: number;
  thumb: string;
  images: string[];
  active: "YES" | "NO";
  status: "NOTSELL" | "SOLD";
  created_at: string;
  updated_at: string;
  note: string | null;
  service: {
    id: number;
    service_key: string;
    note: string;
  };
  admin: {
    id: number;
    name: string;
  };
}
