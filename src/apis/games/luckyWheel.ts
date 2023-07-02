import GameApi from "./gameApi";

const luckyWheelApi = (slug: string) => {
    return new GameApi(slug);
}

export default luckyWheelApi;