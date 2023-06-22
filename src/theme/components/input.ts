import { mode } from '@chakra-ui/theme-tools';

export const inputStyles = {
    components: {
        Input: {
            baseStyle: (props: any) => ({
                field: {
                    fontWeight: 400,
                    borderRadius: '8px',
                    color: mode('secondaryGray.900', 'white')(props),
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
                        bg: mode('white.100', 'navy.800')(props),
                        border: '1px solid',
                        color: 'secondaryGray.600',
                        borderColor: mode('gray.300', 'whiteAlpha.100')(props),
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
