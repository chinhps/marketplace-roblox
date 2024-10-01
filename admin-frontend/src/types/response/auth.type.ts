export interface ILoginResponse {
    token?: string,
    msg: string | Array<string>
}

export interface ILoginInput {
    username: string;
    password: string;
    remember: boolean;
}

export interface ILogoutInput { typeLogout: "CURRENT" | "ALL" }

export interface ILogoutResponse {
    status: number,
    data: {
        msg: string,
    },
}

export interface IInfoUserResponse {
    status: number,
    data: {
        providerId: string,
        name: string,
        price: number,
        diamond: number,
        robux: number,
        created_at: string
    }
}