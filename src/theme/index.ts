import { extendTheme } from "@chakra-ui/react";
import { breakpoints } from "./foundations/breakpoints"
import { sizes } from "./sizes"
import { globalStyles } from "./styles/globalStyles"
import { buttonStyles } from "./components/button";
import { inputStyles } from "./components/input";
import { tableStyles } from "./components/table";

export default extendTheme(
    { breakpoints },
    globalStyles,
    buttonStyles,
    tableStyles,
    inputStyles,
    { sizes },
);