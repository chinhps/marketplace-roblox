import { mode } from '@chakra-ui/theme-tools';

export const inputStyles = {
    components: {
        Input: {
            baseStyle: (props: any) => ({
                field: {
                    fontWeight: 400,
                    borderRadius: '8px',
                    bg: mode('main.item', 'navy.800')(props),
                    border: '1px solid',
                    color: 'secondaryGray.600',
                    borderColor: mode('main.item4', 'whiteAlpha.100')(props),
                },
            }),

            variants: {

            },
        },
        NumberInput: {
            baseStyle: (props: any) => ({
                field: {
                    fontWeight: 400,
                    color: mode('secondaryGray.900', 'white')(props),
                },
            }),

            variants: {

            },
        },
        Select: {
            baseStyle: {
                field: {
                    fontWeight: 400,
                },
            },

            variants: {
                main: (props: any) => ({
                    field: {
                        bg: mode('main.item', 'navy.800')(props),
                        border: '1px solid',
                        color: 'secondaryGray.600',
                        borderColor: mode('main.item4', 'whiteAlpha.100')(props),
                        borderRadius: '5px',
                        _placeholder: { color: 'secondaryGray.600' },
                    },
                    icon: {
                        color: 'secondaryGray.600',
                    },
                }),
            },
        },

    },
};
