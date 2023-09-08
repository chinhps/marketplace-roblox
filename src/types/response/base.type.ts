export interface IBaseResponse<T> {
  data: Array<T>;
  paginate?: IPaginate;
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
