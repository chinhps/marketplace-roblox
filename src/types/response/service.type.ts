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

export interface IServiceDetailResponse {
    id: number,
    game_key: string,
    service_image: {
        name: string,
        images: {
            image_1: string,
            image_2: string,
            image_3: string,
            image_4: string,
            image_5: string,
            image_6: string,
            image_7: string,
            image_8: string,
            image_9: string,
            image_10: string
        }
    },
    notification: string,
    price: number,
    sale: number,
    gifts: Array<string>
}

export interface IServiceHandle {
    roll_name: string,
    price: number,
    gifts: Array<{
        id: number,
        location: number, // potion gift in game
        type: string, // ROBUX, DIAMOND,...
        type_name: string, // name in type
        image?: string,
        msg: string,
        value: number,
    }>,
    total: Array<{
        type: string,
        type_name: string,
        value: number,
    }>
}