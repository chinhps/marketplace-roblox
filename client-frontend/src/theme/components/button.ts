import { mode } from '@chakra-ui/theme-tools';

export const buttonStyles = {
    components: {
        Button: {
            baseStyle: {
                lineHeight: "none",
                _hover: {
                    bg: "main.item4",
                    color: 'white.100',
                },
            },
            variants: {
                outline: () => ({
                    borderRadius: '16px',
                }),
                playGame: () => ({
                    textTransform: "uppercase",
                    fontSize: "17px",
                    fontWeight: "600",
                    padding: "20px 20px",
                    borderRadius: "5px",
                    border: "solid 1.5px",
                    borderColor: "gold.100"
                }),
                playGameTry: () => ({
                    textTransform: "uppercase",
                    fontSize: "17px",
                    fontWeight: "600",
                    padding: "20px 20px",
                    borderRadius: "5px",
                    border: "solid 1.5px",
                    borderColor: "ocean.100"
                }),
                action: () => ({
                    textTransform: "uppercase",
                    fontSize: "15px",
                    fontWeight: "600",
                    marginTop: ".5rem",
                    padding: "15px 20px",
                    borderRadius: "20px",
                    border: "solid 1px",
                    borderColor: "gold.100"
                }),
                serviceBtn: (props: any) => ({
                    bg: mode("ocean.100", "white")(props),
                    color: 'black.100',
                    textTransform: "uppercase",
                    fontSize: "15px",
                    fontWeight: "600",
                    marginTop: ".5rem",
                    padding: "15px 30px",
                    borderRadius: "0",
                    _hover: {
                        bg: "ocean.50",
                        color: 'white.100',
                    },
                }),
                rechargeNow: (props: any) => ({
                    bg: mode("main.item2", "white")(props),
                    color: "var(--color-text-price-top-recharge)",
                    textTransform: "uppercase",
                    fontSize: "18px",
                    fontWeight: "bold",
                    padding: "25px 20px",
                    width: "100%",
                    borderRadius: "5px",
                    _hover: {
                        bg: "black.300",
                    },
                }),
                red: (props: any) => ({
                    bg: mode("red.600", "white")(props),
                    color: 'white.100',
                    padding: "10px 20px",
                    rounded: "2xl",
                    _hover: {
                        bg: "red.500",
                        textDecoration: "none"
                    },
                }),
                gray: (props: any) => ({
                    bg: mode("gray.200", "white")(props),
                    color: 'black.100',
                    padding: "10px 20px",
                    borderRadius: "9px",
                    _hover: {
                        bg: "gray.100",
                        textDecoration: "none"
                    },
                }),
                black: (props: any) => ({
                    bg: mode("black.200", "white")(props),
                    color: 'white.500',
                    textTransform: "uppercase",
                    padding: "10px 20px",
                    borderRadius: "9px",
                    _hover: {
                        bg: "black.300",
                        textDecoration: "none"
                    },
                }),
                user: {
                    fontWeight: "bold",
                    padding: "10px 15px",
                    borderRadius: "5px",
                    outlineColor: "var(--color-btn-1)",
                    _hover: {
                        color: "black.100",
                        bg: 'linear-gradient(45deg, var(--color-btn-1), var(--color-btn-2))',
                    },
                },
                blue: {
                    bg: 'linear-gradient(45deg, var(--color-btn-1), var(--color-btn-2))',
                    color: 'black.100',
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    padding: "10px 20px",
                    borderRadius: "9px",
                    _hover: {
                        color: 'black.100',
                        bg:'linear-gradient(45deg, var(--color-btn-2), var(--color-btn-1))',
                    },
                },
            },
        },
    },
};
