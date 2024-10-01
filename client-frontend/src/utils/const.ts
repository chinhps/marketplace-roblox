import { IFormInput } from "@/types/form.type";
import { UseToastOptions } from "@chakra-ui/react";

export const encryptionKey = import.meta.env.VITE_APP_ENCRYPT_KEY;
export const hmacKey = import.meta.env.VITE_APP_HMAC_KEY;

export const listOption = [
  {
    lable: "Tài khoản",
    children: [
      {
        lable: "Thông tin",
        link: "/profile",
      },
    ],
  },
  {
    lable: "Nạp tiền",
    children: [
      {
        lable: "Nạp thẻ cào (Tự động)",
        link: "/profile/recharge",
      },
    ],
  },
  {
    lable: "Rút vật phẩm",
    children: [
      {
        lable: "Rút Kim cương",
        link: "/profile/withdraw/withdraw-diamond",
      },
      {
        lable: "Rút Robux",
        link: "/profile/withdraw/withdraw-robux",
      },
    ],
  },
  {
    lable: "Lịch sử",
    children: [
      {
        lable: "Lịch sử nạp thẻ",
        link: "/profile/history/recharges",
      },
      {
        lable: "Lịch sử mua tài khoản",
        link: "/profile/history/purchases",
      },
      {
        lable: "Lịch sử chơi game",
        link: "/profile/history/service",
      },
      {
        lable: "Lịch sử rút/mua",
        link: "/profile/history/withdraw",
      },
    ],
  },
];

export const listOptionProfile = insertObjectAtPosition(
  listOption,
  {
    lable: "Dịch vụ",
    children: [
      {
        lable: "Gamepass",
        link: "/service-game-pass/gamepass-blox-fruits",
      },
      {
        lable: `Mua Robux 120h`,
        link: "/profile/withdraw/buy-robux",
      },
    ],
  },
  3
);

export const ATM_DISCOUNT = 0.9;
export const TIMEOUT_SLEEP = 3; // second
export const token = () => {
  return localStorage.getItem("auth._token.local");
};

function insertObjectAtPosition(
  array: {
    lable: string;
    children: {
      lable: string;
      link: string;
    }[];
  }[],
  object: {
    lable: string;
    children: {
      lable: string;
      link: string;
    }[];
  },
  position: number
) {
  if (position < 0) {
    position = 0;
  } else if (position > array.length) {
    position = array.length;
  }
  const newArray = [...array];
  newArray.splice(position, 0, object);
  return newArray;
}

export const customToast: UseToastOptions = {
  position: "top",
  variant: "left-accent",
  isClosable: true,
};

export const styleTextShadow = {
  color: "var(--color-text-header-account)",
  // textShadow: "0 0 30px black", // Điều chỉnh giá trị để tạo hiệu ứng bóng chữ
};

export const initialServiceUnitFormState: IFormInput[] = [
  {
    label: "TÊN ĐĂNG NHẬP ACC ROBLOX",
    name: "username_roblox",
    type: "INPUT",
    isRequired: true,
    placeholder: "Nhập tên đăng nhập acc roblox của bạn",
  },
  {
    label: "MẬT KHẨU ROBLOX",
    name: "password_roblox",
    type: "INPUT",
    isRequired: true,
    placeholder: "Nhập mật khẩu acc roblox của bạn",
  },
  {
    label: "GHI CHÚ THÊM CHO ADMIN",
    name: "note_roblox",
    type: "TEXTAREA",
    placeholder: "Tên 3 trò chơi gần nhất...",
  },
];

export const initialGamepassFormState: IFormInput[] = [
  {
    label: "Chọn gói",
    name: "id_parcel",
    type: "SELECT",
    isRequired: true,
    placeholder: "--- Chọn gói ---",
    selects: [],
  },
  ...initialServiceUnitFormState,
];
