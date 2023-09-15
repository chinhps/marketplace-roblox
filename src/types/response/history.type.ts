export interface IPurchaseHistory {
    id: number,
    account_id: number,
    price: number,
    refund: boolean,
    created_at: string,
    service_name: string,
    detail: Array<{
        name: string,
        value: string
    }>
}

export interface IRechargeHistory {
    id: number,
    refund: boolean,
    price: number,
    status: string,
    created_at: string,
    recharge_type: string,
    detail: Array<{
        key: string,
        name: string,
        value: string | number
    }>
}

export interface IWithdrawHistory {
    id: number,
    refund: boolean,
    value: number,
    status: 'PENDING' | 'SUCCESS' | 'CANCEL' | 'PROCESSING',
    withdraw_type: "ROBUX" | "DIAMOND",
    detail: Array<{
        key: string,
        name: string,
        value: string | number
    }>,
    updated_at: string,
    created_at: string
}

export interface IServiceHistory {
    id: number,
    quantity: number,
    service_name: string,
    default: string,
    price: number,
    // detail: Array<{
    //     name: string
    // }>,
    created_at: string
}