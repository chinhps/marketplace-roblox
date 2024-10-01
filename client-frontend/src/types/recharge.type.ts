interface Card {
    name: string;
    image: string;
}

export interface Cards {
    percent: number;
    list_card_support: {
        [key: string]: Card;
    };
}
