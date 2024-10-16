export interface IServiceGroupResponse {
  id: number;
  name: string;
  image: string;
  serviceList: Array<IServiceListResponse>;
}

export interface IServiceListResponse {
  id: number;
  name: string;
  thumb: string;
  price: number;
  gameType: string;
  counter: number;
  slug: string;
  counterText: string | "AUTO";
  more: { [key: string]: string };
  notification: string | null;
  sale: number;
}

export interface IServiceUnitResponse {
  id: number;
  price: number;
  name: string;
  image: string;
}
export interface IServiceDetailResponse {
  id: number;
  game_key: string;
  unit_type?: string;
  service_image: {
    name: string;
    images: {
      image_1: string;
      image_2: string;
      image_3: string;
      image_4: string;
      image_5: string;
      image_6: string;
      image_7: string;
      image_8: string;
      image_9: string;
      image_10: string;
    };
  };
  notification: string;
  price: number;
  sale: number;
  gifts: Array<string>;
  parcels: Array<{
    id: string;
    text: string;
  }>;
  sale_for_numloop: {
    [key: string]: number
  }
}

export interface IServiceHandle {
  roll_name: string;
  price: number;
  gifts: Array<{
    id: number;
    location: number; // potion gift in game
    type: string; // ROBUX, DIAMOND,...
    type_name: string; // name in type
    image?: string;
    msg: string;
    value: number;
  }>;
  total: Array<{
    type: string;
    type_name: string;
    value: number;
  }>;
}

export interface IServiceAccountDetail {
  id: number;
  service_image: {
    name: string;
    image: string;
  };
  notification: string;
  game_type: string;
}

export interface IAccountService {
  id: number;
  detail: Array<{
    key: string;
    name: string;
    value: string | number;
  }>;
  sale: number | null;
  note: string | null;
  price: number;
  thumb: string;
  images: Array<string>;
  status: string | null;
}

export interface IPaginate {
  current_page: number;
  last_page: number;
  total: number;
}
