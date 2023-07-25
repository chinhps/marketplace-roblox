import { IPaginate } from "./service.type"

export interface IBaseResponse<T> {
    data: Array<T>,
    paginate?: IPaginate
}

export interface IBaseResponseDetail<T> {
    data: T
}