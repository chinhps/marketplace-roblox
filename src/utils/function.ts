import { IFormInput } from "@/types/form.type";
import { IDetail2P } from "@/types/response/base.type";

export const numberFormat = (price: number, currency: boolean = true) => {
  const format = new Intl.NumberFormat("vi-VN", {
    style: currency ? "currency" : undefined,
    currency: currency ? "VND" : undefined,
  }).format(price);
  return format;
};

export const myDomain = () => {
  return window.location.hostname.split(".").slice(-2).join(".");
};

export const token = () => {
  return localStorage.getItem("auth._token.local");
};

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

export function objectToFormData(
  formData: FormData,
  data: Record<string, any>,
  parentKey: string | null = null
) {
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      const newKey = parentKey ? `${parentKey}[${key}]` : key;

      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          const newItemKey = `${newKey}[${index}]`;
          if (item instanceof File) {
            formData.append(newItemKey, item);
            return;
          }
          if (typeof item === "object" && item !== null) {
            objectToFormData(formData, item, newItemKey);
            return;
          }
          formData.append(newItemKey, item);
        });
      } else if (value instanceof File) {
        formData.append(newKey, value);
      } else if (typeof value === "object" && value !== null) {
        objectToFormData(formData, value, newKey);
      } else {
        formData.append(newKey, value);
      }
    }
  }
}

export function compareForm(values: IDetail2P[], froms: IFormInput[] | undefined) {
  const map1 = new Map(values.map((item) => [item.key, item.value]));
  const resultArray = froms?.map((item) => ({
    ...item,
    default: map1.get(item.name),
  }));
  return resultArray ?? [];
}
