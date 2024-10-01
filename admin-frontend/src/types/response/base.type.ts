export interface IBaseResponse<T> {
  data: Array<T>;
  paginate?: IPaginate;
}

export interface IBaseResponseData<T> {
  data: Array<T>;
  status: number;
}

export interface IBaseResponseDetail<T> {
  data: T;
}

export interface IResponseWithMessage {
  msg: string | Array<string>;
}

export interface IPaginate {
  current_page: number;
  last_page: number;
  total: number;
}

export interface IDetail2P {
  key: string;
  name: string;
  value: string | number;
}
