import { extendTheme, withDefaultSize, withDefaultVariant } from "@chakra-ui/react";
import { breakpoints } from "./foundations/breakpoints"
import { sizes } from "./sizes"
import { globalStyles } from "./styles/globalStyles";
import { inputStyles } from "./components/input";
import { buttonStyles } from "./components/button";
import { tabsTheme } from "./components/tab";

export default extendTheme(
    withDefaultVariant({
        variant: 'unstyled',
        components: ['Table'],
    }),
    withDefaultSize({
        size: "lg",
        components: ['Table'],
    }),
    globalStyles,
    inputStyles,
    {
        components: {
            Tabs: tabsTheme,
        },
    },
    buttonStyles,
    { breakpoints },
    { sizes },
);