export const numberFormat = (price: number, currency: boolean = true) => {
    const format = new Intl.NumberFormat('vi-VN', {
        style: currency ? 'currency' : undefined,
        currency: currency ? 'VND' : undefined,
    }).format(price);
    return format;
}