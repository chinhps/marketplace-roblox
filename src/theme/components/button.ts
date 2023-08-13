
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
                outlineRed: () => ({
                    textTransform: "uppercase",
                    fontSize: "15px",
                    fontWeight: "600",
                    padding: "20px",
                    borderRadius: "7px",
                    bg: "main.item",
                    color: "main.text",
                    border: "solid 1.5px",
                    borderColor: "ocean.100"
                }),
                auth: () => ({
                    padding: "15px 20px",
                    bg: "main.item",
                    color: "main.text",
                }),
            },
        },
    },
};
