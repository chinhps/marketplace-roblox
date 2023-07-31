import { UseToastOptions } from "@chakra-ui/react";

export const listOption = [
    {
        lable: 'Tài khoản',
        children: [
            {
                lable: 'Thông tin',
                link: '/profile',
            },
        ],
    },
    {
        lable: 'Nạp tiền',
        children: [
            {
                lable: 'Nạp thẻ cào (Tự động)',
                link: '/profile/recharge',
            },
        ],
    },
    {
        lable: 'Robux',
        children: [
            {
                lable: 'Rút Robux',
                link: '/profile/withdraw/withdraw-robux',
            },
            {
                lable: `Mua Robux 120h`,
                link: '/profile/withdraw/buy-robux',
            },
        ],
    },
    {
        lable: 'Lịch sử',
        children: [
            {
                lable: 'Lịch sử nạp thẻ',
                link: '/profile/history/recharges',
            },
            {
                lable: 'Lịch sử mua tài khoản',
                link: '/profile/history/purchases',
            },
            {
                lable: 'Lịch sử chơi game',
                link: '/profile/history/games',
            },
            {
                lable: 'Lịch sử rút/mua Robux',
                link: '/profile/history/robux',
            },
            // {
            //     lable: 'Lịch sử mua Gamepass',
            //     link: '/profile/history/buy-gamepass',
            // },
        ],
    },
];

export const ATM_DISCOUNT = 0.9; 
export const TIMEOUT_SLEEP = 3;// second
export const token = () => {
    return localStorage.getItem("auth._token.local");
}

export const customToast: UseToastOptions = {
    position: "top",
    variant: "left-accent",
}