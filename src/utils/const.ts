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
      {
        lable: `Mua Robux 120h`,
        link: "/profile/withdraw/buy-robux",
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

export const ATM_DISCOUNT = 0.9;
export const TIMEOUT_SLEEP = 3; // second
export const token = () => {
  return localStorage.getItem("auth._token.local");
};

export const customToast: UseToastOptions = {
  position: "top",
  variant: "left-accent",
  isClosable: true,
};

export const styleTextShadow = {
  color: "white",
  textShadow: "0 0 30px black", // Điều chỉnh giá trị để tạo hiệu ứng bóng chữ
};
