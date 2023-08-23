import { textareaTheme } from "./textarea";

export const inputStyles = {
    components: {
        Input: {
            variants: {
                search: () => ({
                    field: {
                        fontWeight: 400,
                        borderRadius: '5px',
                        bg: '#ffffff1f',
                        border: '1px solid',
                        color: "white",
                        borderColor: 'whiteAlpha.100',
                    },
                }),
                auth: () => ({
                    field: {
                        fontWeight: 400,
                        borderRadius: '7px',
                        bg: '#ffffff1f',
                        border: '1px solid',
                        color: "black",
                        borderColor: 'main.item',
                    },
                }),
            },
        },
        Select: {
            variants: {
                auth: () => ({
                    field: {
                        // fontWeight: 400,
                        borderRadius: '7px',
                        bg: '#ffffff1f',
                        border: '1px solid',
                        color: "black",
                        borderColor: 'main.item',
                    },
                }),
            },
        },
        NumberInput: {
            variants: {
                auth: () => ({
                    field: {
                        fontWeight: 400,
                        borderRadius: '7px',
                        bg: '#ffffff1f',
                        border: '1px solid',
                        color: "black",
                        borderColor: 'main.item',
                    },
                }),
            },
        },
        Textarea: textareaTheme
    },
};