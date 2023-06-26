export interface IServiceGroupResponse {
    id: number,
    name: string,
    image: string,
    serviceList: Array<IServiceListResponse>
}

export interface IServiceListResponse {
    id: number,
    name: string,
    thumb: string,
    price: number,
    gameType: string,
    counter: number,
    slug: string,
    counterText: string | "AUTO"
}