export interface IHistoryRecharge {
    id: number;
    code: string;
    serial: string;
    cash: number;
    status_name: string;
    status: boolean;
    type: string;
    created_at: string;
}

export interface IHistoryPurchase {
    id: number,
    id_account: number,
    user: string,
    account: boolean,
    password: string,
    created_at: string,
    cash: number,
    type: string,
}

export interface IHistoryGame {
    description: string,
    type: string,
    created_at: string,
    count: number,
    cash: number | null,
}

export interface IHistoryRobux {
    id: number,
    robux: number,
    created_at: string,
    updated_at: string,
    status: number,
    name_withdraw: string,
    status_name: string,
    type_withdraw: string,
}

export interface IHistoryBuyGamepass {
    id: number,
    name_product: string,
    type: string,
    status: number,
    created_at: string,
    user: string,
    password: string,
    note: string,
    cash: number,
    note_admin: null,
    status_name: string,
}

export interface Links {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}

export interface Meta {
    current_page: number;
    from: number;
    last_page: number;
    links: LinkItem[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface LinkItem {
    url: string | null;
    label: string;
    active: boolean;
}
