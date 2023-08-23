export const numberFormat = (price: number, currency: boolean = true) => {
    const format = new Intl.NumberFormat('vi-VN', {
        style: currency ? 'currency' : undefined,
        currency: currency ? 'VND' : undefined,
    }).format(price);
    return format;
}

export const myDomain = () => {
    return window.location.hostname.split('.').slice(-2).join('.');
}

export const token = () => {
    return localStorage.getItem("auth._token.local");
}

export const logout = () => {
    localStorage.removeItem("auth._token.local");
}

export function colorStatus(status: string) {
    switch (status) {
        case "3":
            return "green";
        case "1":
            return "red";
        default:
            return "gray";
    }
}

export function nameStatus(status: string) {
    switch (status) {
        case "3":
            return "Đã duyệt";
        case "1":
            return "Đã hủy";
        default:
            return "Chờ duyệt";
    }
}