export enum IServiceType {
  LUCKY_CARD = "LUCKY_CARD",
  WHEEL = "WHEEL",
  BOX = "BOX",
  LINKTO = "LINKTO",
  LUCKY_BOX = "LUCKY_BOX",
  ACCOUNT = "ACCOUNT",
  CATEGORY = "CATEGORY",
  RANDOM = "RANDOM",
}

export interface IGiftAdd {
  image: File;
  typeGift: "ROBUX" | "DIAMOND" | "QUANHUY" | "NOT";
  message: string;
  value: number | string | Array<number>;
  percent: number;
  isRandom: boolean;
  isVip: boolean;
}

export interface IOddsAdd {
  isRandomAdmin: boolean;
  isRandomUser: boolean;
  oddsAdmin: Array<{
    id: number;
    description: string;
  }>;
  oddsUser: Array<{
    id: number;
    description: string;
  }>;
  listGift: Array<IGiftAdd>;
}

export interface IFormCreateService {
  active_service: boolean;
  name_service_image: string;
  note_service: string;
  notification_service: string;
  price_service: string | number;
  sale_service: string | number;
  thumb_service_image: Array<File>;
  image_1?: Array<File>;
  image_2?: Array<File>;
  image_3?: Array<File>;
  image_4?: Array<File>;
}

export interface IServiceMutate {
  dataForm: IFormCreateService;
  dataOdds: IOddsAdd | undefined;
  dataExcept: Array<string | number> | undefined;
}

export interface IServiceMutation {
  formData: FormData;
  data: string | undefined;
}
