export const numberFormat = (price: number, currency: boolean = true) => {
  const format = new Intl.NumberFormat('vi-VN', {
    style: currency ? 'currency' : undefined,
    currency: currency ? 'VND' : undefined,
  }).format(price);
  return format;
}

export function shuffleArray(arr: Array<string>) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const logout = () => {
  localStorage.removeItem("auth._token.local");
}

export function colorStatus(status: number) {
  switch (status) {
    case 3:
      return "green";
    case 1:
      return "red";
    default:
      return "gray";
  }
}