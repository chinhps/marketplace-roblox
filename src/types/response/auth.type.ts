export interface ILoginInput { username: string; password: string }
export interface IRegisterInput { username: string, password: string, password_confirmation: string }
export interface ILogoutInput { typeLogout: "CURRENT" | "ALL" }
export interface ILoginResponse {
    token?: string,
    msg: string | Array<string>
}
export interface IRegisterResponse {
    token?: string,
    msg: string | Array<string>
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

export interface ILogoutResponse {
    status: number,
    data: {
        msg: string,
    },
}
