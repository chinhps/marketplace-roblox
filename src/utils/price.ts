export const numberFormat = (price: number, currency: boolean = true) => {
  const format = new Intl.NumberFormat("vi-VN", {
    style: currency ? "currency" : undefined,
    currency: currency ? "VND" : undefined,
  }).format(price);
  return format;
};

export function shuffleArray(arr: Array<string> | undefined) {
  if (!arr) return arr;
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const logout = () => {
  localStorage.removeItem("auth._token.local");
};

export function colorStatus(status: string) {
  switch (status) {
    case "SUCCESS":
      return "green";
    case "CANCEL":
      return "red";
    case "PROCESSING":
      return "blue";
    default:
      return "gray";
  }
}

export function nameStatus(status: string) {
  switch (status) {
    case "SUCCESS":
      return "Đã duyệt";
    case "CANCEL":
      return "Đã hủy";
    case "PROCESSING":
      return "Đang thực hiện";
    default:
      return "Chờ duyệt";
  }
}
