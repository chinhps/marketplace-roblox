import { createStandaloneToast } from "@chakra-ui/react";
import { customToast } from "./const";

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
    case "ERROR":
      return "red";
    case "PROCESSING":
      return "blue";
    case "PENDING":
      return "gray";
    default:
      return "gray";
  }
}

export function hiddenTagByGameType(gameType: string) {
  switch (gameType) {
    case "LINKTO":
      return false;
    case "GAMEPASS":
      return false;
    case "GAMEPASS_IMAGE":
      return false;
  }
  return true;
}

export function hiddenPriceByGameType(gameType: string) {
  switch (gameType) {
    case "LINKTO":
      return false;
    case "CATEGORY":
      return false;
    case "ACCOUNT":
      return false;
    case "GAMEPASS":
      return false;
    case "GAMEPASS_IMAGE":
      return false;
  }
  return true;
}

export function textCounterService(gameType: string) {
  switch (gameType) {
    case "BOX":
      return "Hiện có:";
    case "ACCOUNT":
      return "Hiện có:";
    case "RANDOM":
      return "Hiện có:";
    default:
      return "Đã sử dụng:";
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

export function ucwords(str: string) {
  return str.toLowerCase().replace(/(^|\s)\S/g, function (match) {
    return match.toUpperCase();
  });
}

export const handleCopy = async (text: string) => {
  const { toast } = createStandaloneToast();
  try {
    await navigator.clipboard.writeText(text);
    toast({
      description: "Sao chép ID thành công!",
      ...customToast,
    });
  } catch (error) {
    toast({
      description: "Thất bại khi sao chép!",
      status: "warning",
      ...customToast,
    });
  }
};
